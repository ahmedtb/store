import { View, Pressable } from "react-native";

export default function RadioButton(props: { selected: boolean, style?: object, onClick: () => void }) {
    return (
        <Pressable
            onPress={props.onClick}
            style={[{
                height: 24,
                width: 24,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: '#000',
                alignItems: 'center',
                justifyContent: 'center',
            }, props.style]}>
            {
                props.selected ?
                    <View style={{
                        height: 12,
                        width: 12,
                        borderRadius: 6,
                        backgroundColor: '#f0c14b',
                    }} />
                    : null
            }
        </Pressable>
    );
}