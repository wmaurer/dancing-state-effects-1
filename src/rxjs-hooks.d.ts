import { Observable } from 'rxjs';
import 'rxjs-hooks';
declare module 'rxjs-hooks' {
    export declare type RestrictArray<T> = T extends any[] ? T : [];
    export declare type Not<P, T, F> = P extends false ? T : F;
    type VoidableCallback<EventValue> = [EventValue] extends [void] ? () => void : (val: EventValue) => void;
    export type EventCallbackState<EventValue, State, Inputs = void> = [
        VoidableCallback<EventValue>,
        [
            State extends void ? null : State,
            BehaviorSubject<State | null>,
            BehaviorSubject<RestrictArray<Inputs> | null>
        ]
    ];
    export type ReturnedState<EventValue, State, Inputs> = [
        EventCallbackState<EventValue, State, Inputs>[0],
        EventCallbackState<EventValue, State, Inputs>[1][0]
    ];
    export type EventCallback<EventValue, State, Inputs> = Not<
        Inputs extends void ? true : false,
        (
            eventSource$: Observable<EventValue>,
            inputs$: Observable<RestrictArray<Inputs>>,
            state$: Observable<State>,
        ) => Observable<State>,
        (eventSource$: Observable<EventValue>, state$: Observable<State>) => Observable<State>
    >;
    export declare function useEventCallback<EventValue>(
        callback: EventCallback<EventValue, void, void>,
    ): ReturnedState<EventValue, void | null, void>;
    export function useEventCallback<EventValue, State>(
        callback: EventCallback<EventValue, State, void>,
        initialState: State,
    ): ReturnedState<EventValue, State, void>;
    export function useEventCallback<EventValue, State, Inputs>(
        callback: EventCallback<EventValue, State, Inputs>,
        initialState: State,
        inputs: RestrictArray<Inputs>,
    ): ReturnedState<EventValue, State, Inputs>;
}
