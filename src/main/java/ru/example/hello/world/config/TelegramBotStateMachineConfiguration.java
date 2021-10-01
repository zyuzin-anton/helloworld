package ru.example.hello.world.config;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.statemachine.StateMachineContext;
import org.springframework.statemachine.StateMachinePersist;
import org.springframework.statemachine.config.EnableStateMachineFactory;
import org.springframework.statemachine.config.EnumStateMachineConfigurerAdapter;
import org.springframework.statemachine.config.builders.StateMachineConfigurationConfigurer;
import org.springframework.statemachine.config.builders.StateMachineStateConfigurer;
import org.springframework.statemachine.config.builders.StateMachineTransitionConfigurer;
import org.springframework.statemachine.persist.DefaultStateMachinePersister;
import org.springframework.statemachine.persist.StateMachinePersister;
import ru.example.hello.world.action.SaveUsernameAction;
import ru.example.hello.world.action.StartAction;
import ru.example.hello.world.action.StartRegistrationAction;
import ru.example.hello.world.telegram.TelegramBotCommand;
import ru.example.hello.world.telegram.TelegramBotState;

import java.util.EnumSet;
import java.util.HashMap;
import java.util.Map;

@AllArgsConstructor
@Configuration
@EnableStateMachineFactory
public class TelegramBotStateMachineConfiguration extends EnumStateMachineConfigurerAdapter<TelegramBotState, TelegramBotCommand> {

    private StartAction startAction;
    private StartRegistrationAction startRegistrationAction;
    private SaveUsernameAction saveUsernameAction;

    @Override
    public void configure(StateMachineConfigurationConfigurer<TelegramBotState, TelegramBotCommand> config) throws Exception {
        config
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
                .target(TelegramBotState.END)
                .event(TelegramBotCommand.USER_MESSAGE)
                .actionFunction(saveUsernameAction);
    }

    @Bean
    public InMemoryPersist inMemoryPersist() {
        return new InMemoryPersist();
    }

    @Bean
    public StateMachinePersister<TelegramBotState, TelegramBotCommand, Long> persister(InMemoryPersist inMemoryPersist) {
        return new DefaultStateMachinePersister<>(inMemoryPersist);
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