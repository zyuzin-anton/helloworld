package ru.example.hello.world.config;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import org.springframework.statemachine.StateMachine;
import org.springframework.statemachine.StateMachineContext;
import org.springframework.statemachine.StateMachinePersist;
import org.springframework.statemachine.config.EnableStateMachineFactory;
import org.springframework.statemachine.config.EnumStateMachineConfigurerAdapter;
import org.springframework.statemachine.config.builders.StateMachineConfigurationConfigurer;
import org.springframework.statemachine.config.builders.StateMachineStateConfigurer;
import org.springframework.statemachine.config.builders.StateMachineTransitionConfigurer;
import org.springframework.statemachine.persist.DefaultStateMachinePersister;
import org.springframework.statemachine.persist.StateMachinePersister;
import org.springframework.statemachine.persist.StateMachineRuntimePersister;
import org.springframework.statemachine.state.State;
import org.springframework.statemachine.support.StateMachineInterceptor;
import org.springframework.statemachine.support.StateMachineInterceptorAdapter;
import org.springframework.statemachine.transition.Transition;
import ru.example.hello.world.action.ActionVariable;
import ru.example.hello.world.action.SaveUsernameAction;
import ru.example.hello.world.action.ShowNearestTodoAction;
import ru.example.hello.world.action.StartAction;
import ru.example.hello.world.action.StartRegistrationAction;
import ru.example.hello.world.telegram.TelegramBotCommand;
import ru.example.hello.world.telegram.TelegramBotState;

import java.util.EnumSet;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@AllArgsConstructor
@Configuration
@EnableStateMachineFactory
public class TelegramBotStateMachineConfiguration extends EnumStateMachineConfigurerAdapter<TelegramBotState, TelegramBotCommand> {

    private StartAction startAction;
    private StartRegistrationAction startRegistrationAction;
    private SaveUsernameAction saveUsernameAction;
    private ShowNearestTodoAction showNearestTodoAction;

    @Override
    public void configure(StateMachineConfigurationConfigurer<TelegramBotState, TelegramBotCommand> config) throws Exception {
        config
                .withPersistence()
                .runtimePersister(runtimePersister())
            .and()
                .withConfiguration()
                .autoStartup(false);
    }

    @Override
    public void configure(StateMachineStateConfigurer<TelegramBotState, TelegramBotCommand> states) throws Exception {
        states.withStates()
                .initial(TelegramBotState.START)
                .end(TelegramBotState.END)
                .states(EnumSet.allOf(TelegramBotState.class));
    }

    @Override
    public void configure(StateMachineTransitionConfigurer<TelegramBotState, TelegramBotCommand> transitions) throws Exception {
        transitions
                .withInternal()
                .source(TelegramBotState.START)
                .actionFunction(startAction)
                .event(TelegramBotCommand.START)
            .and()
                .withExternal()
                .source(TelegramBotState.START)
                .target(TelegramBotState.PRE_END)
                .actionFunction(showNearestTodoAction)
                .event(TelegramBotCommand.SHOW_NEAREST)
            .and()
                .withExternal()
                .source(TelegramBotState.START)
                .target(TelegramBotState.USERNAME)
                .event(TelegramBotCommand.LINK)
                .actionFunction(startRegistrationAction)
            .and()
                .withExternal()
                .source(TelegramBotState.USERNAME)
                .target(TelegramBotState.START)
                .event(TelegramBotCommand.START)
                .actionFunction(startAction)
            .and()
                .withExternal()
                .source(TelegramBotState.USERNAME)
                .target(TelegramBotState.PRE_END)
                .event(TelegramBotCommand.USER_MESSAGE)
                .actionFunction(saveUsernameAction)
            .and()
                .withExternal()
                .source(TelegramBotState.PRE_END)
                .target(TelegramBotState.START)
                .event(TelegramBotCommand.START)
            .and()
                .withExternal()
                .source(TelegramBotState.PRE_END)
                .target(TelegramBotState.END)
                .event(TelegramBotCommand.TERMINATE);
    }

    @Bean
    public InMemoryPersist inMemoryPersist() {
        return new InMemoryPersist();
    }

    @Bean
    public StateMachinePersister<TelegramBotState, TelegramBotCommand, Long> persister(InMemoryPersist inMemoryPersist) {
        return new DefaultStateMachinePersister<>(inMemoryPersist);
    }

    @Bean
    public StateMachineRuntimePersister<TelegramBotState, TelegramBotCommand, Long> runtimePersister() {
        return new StateMachineRuntimePersister<TelegramBotState, TelegramBotCommand, Long>() {
            @Override
            public void write(StateMachineContext<TelegramBotState, TelegramBotCommand> context, Long contextObj) {}

            @Override
            public StateMachineContext<TelegramBotState, TelegramBotCommand> read(Long contextObj) { return null; }

            @Override
            public StateMachineInterceptor<TelegramBotState, TelegramBotCommand> getInterceptor() {
                return new StateMachineInterceptorAdapter<TelegramBotState, TelegramBotCommand>() {

                    @Override
                    public void postStateChange(
                            State<TelegramBotState, TelegramBotCommand> state,
                            Message<TelegramBotCommand> message,
                            Transition<TelegramBotState, TelegramBotCommand> transition,
                            StateMachine<TelegramBotState, TelegramBotCommand> stateMachine,
                            StateMachine<TelegramBotState, TelegramBotCommand> rootStateMachine
                    ) {
                        val chatId = stateMachine.getExtendedState().get(ActionVariable.CHAT_ID, Long.class);
                        try {
                            if (stateMachine.getState().getId().equals(state.getId())) {
                                persister(inMemoryPersist()).persist(stateMachine, chatId);
                                log.info("State machine has been persisted for chat id: {} in state {}", chatId, state.getId());
                            }
                        } catch (Exception e) {
                            log.error("Exception occurred while saving state machine for chat id: {}", chatId, e);
                        }
                    }
                };
            }
        };
    }
}

class InMemoryPersist implements StateMachinePersist<TelegramBotState, TelegramBotCommand, Long> {

    private Map<Long, StateMachineContext<TelegramBotState, TelegramBotCommand>> storage = new HashMap<>();

    @Override
    public void write(StateMachineContext<TelegramBotState, TelegramBotCommand> context, Long contextObj) {
        storage.put(contextObj, context);
    }

    @Override
    public StateMachineContext<TelegramBotState, TelegramBotCommand> read(Long contextObj) {
        return storage.get(contextObj);
    }
}