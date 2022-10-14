import {Pressable, StyleSheet} from 'react-native';

export default function PrimaryButton({children, flex, borderRadius, styling, action, disabled}){
    return(
        <Pressable style={[styles.button,{flex: flex,borderRadius: borderRadius},styling]} onPress={action} disabled={disabled}>
            {children}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#0076FF',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '5%',
        elevation: 2,
    }
})