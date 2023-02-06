import { create, StateCreator } from 'zustand';
import { DropsState, MetasState, TDrop, TMeta } from '../models/interfaces';

const initialDrops = [
    { id:"111",content: "This is a note taken to remember!!", metas: [ { type: 'type', value:'DropText' }, { type:'extension', value:"Recurrent"}, { type:'label', value:"Personal Tag"}]},
    { id:"222",content: [{ item: "Do Dishes", checked: false},{ item: "Make Bed", checked: false},{ item: "Clean Bathroom", checked: false},{ item: "Feed Dog", checked: false}], metas: [ { type: 'type', value:'DropCheckList' }, { type:'person', value:"Christine Pike"}, { type:'group', value:"Project"}]},
    { id:"333",content: { description:"This is a beautiful image...", src: '/assets/images/placeholders/covers/1.jpg'}, metas: [ {type: 'type', value: 'DropImage' }, {type: 'public', value: 'OceanOS Blog' }]},
    { id:"444",content: "This is a response from ChatGPT", metas: [ { type:'type', value:"DropText"}, { type:'dapp', value:"ChatGPT"}]}
];


const initialMetas = [
    { type: 'type', value: 'DropText' },
    { type: 'type', value: 'DropImage' },
    { type: 'type', value: 'DropCheckList' },
    { type: 'label', value: 'personal' },
    { type: 'person', value: 'person' },
    { type: 'extension', value: 'extension' },
    { type: 'public', value: 'public' },
    { type: 'group', value: 'group' },
    { type: 'dapp', value: 'dapp' },
]


export type OOSState = DropsState & MetasState;

export const dropsState:StateCreator<DropsState> = (set,get) => ({
    drops: initialDrops,
    addDrop: (drop:TDrop) => set((state) => ({ drops: [...state.drops, drop] })),
})

export const metasState:StateCreator<MetasState> = (set,get) => ({
    metas: initialMetas,
    addMetas: () => set((state) => ({ metas: [] })),
    metaTypes: () => [...get().metas.reduce( (acc,v) => acc.add(v.type), new Set<string>)]
})


export const useOOSStore = create<OOSState>()((...a) => ({
    ...dropsState(...a),
    ...metasState(...a)
}))

