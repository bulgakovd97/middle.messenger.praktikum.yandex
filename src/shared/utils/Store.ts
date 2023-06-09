import { Chat, MessageResponse, User } from '@/api/types';
import { Block } from './Block';
import { EventBus } from './EventBus';
import { Socket } from '@/api/Socket';
import { set } from './helpers';

export enum StoreEvents {
  Updated = 'Updated',
}

type State = {
  user: {
    data: User | null;
    hasError: boolean;
    isLoading: boolean;
  },
  chats: {
    data: Chat[];
    hasError: boolean;
    isLoading: boolean;
    token?: string;
  },
  chat: {
    data: Chat | null;
    hasError: boolean;
    isLoading: boolean;
  },
  socket: Socket | null,
  messages: {
    data: MessageResponse[],
  },
};

const initialState: State = {
  user: {
    data: null,
    hasError: false,
    isLoading: true,
  },
  chats: {
    data: [],
    hasError: false,
    isLoading: true,
    token: undefined,
  },
  chat: {
    data: null,
    hasError: false,
    isLoading: true,
  },
  socket: null,
  messages: {
    data: [],
  },
};

class Store extends EventBus {
  private state = initialState;

  public set(keypath: string, value: unknown) {
    set(this.state, keypath, value);

    this.emit(StoreEvents.Updated, this.state);
  }

  public getState() {
    return this.state;
  }
}

export const store = new Store();

export const withStore = (mapStateToProps: (state: State) => any) => {
  return (Component: typeof Block) => {
    return class WithStore extends Component {
      constructor(props: any) {
        const mappedState = mapStateToProps(store.getState());
        super({ ...props, ...mappedState });

        store.on(StoreEvents.Updated, (newState) => {
          const newMappedState = mapStateToProps(newState);
          this.setProps(newMappedState);
        });
      }
    };
  };
};
