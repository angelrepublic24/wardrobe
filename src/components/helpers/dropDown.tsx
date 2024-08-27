interface Prop {
    setter: React.Dispatch<React.SetStateAction<boolean>>
}

export const dropDown = ({setter}: Prop) =>{
    setter(prev => !prev)
}
