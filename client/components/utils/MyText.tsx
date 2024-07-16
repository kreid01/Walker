import { Text } from "react-native"

interface MyTextProps {
    style?: string
    children: React.ReactNode
}

export const MyText: React.FC<MyTextProps> = ({ style, children }) => {
    return (
        <Text style={{ fontFamily: "vt" }} className={style.toString()}>{children}</Text>
    )
}