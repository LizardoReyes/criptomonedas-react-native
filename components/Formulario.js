import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Touchable, TouchableHighlight, Alert } from 'react-native'
import {Picker} from "@react-native-community/picker"
import axios from "axios"

const Formulario = ({moneda, criptomoneda, setMoneda, setCriptomoneda, setConsultarAPI}) => {
    const [criptomonedas, setCriptomonedas] = useState([])

    useEffect(() => {
        const consultarAPI = async() => {
            const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`
            const resultado = await axios.get(url)
            console.log(resultado.data.Data)
            setCriptomonedas(resultado.data.Data)
        }
        consultarAPI()
    }, [])

    const obtenerMoneda = moneda => {
        setMoneda(moneda)
    }

    const obtenerCriptomoneda = cripto => {
        setCriptomoneda(cripto)
    }

    const mostrarAlerta = () => {
        Alert.alert(
            "Error",
            "Ambos campos son obligatorios",
            [
                { text: "De acuerdo" }
            ]
        )
    }

    const cotizarPrecio = () => {
        if(moneda.trim() === "" || criptomoneda.trim() === ""){
            mostrarAlerta()
            return
        }
        setConsultarAPI(true)

    }

    return (
        <View>
            <Text style={styles.label}>Moneda</Text>
            <Picker
                selectedValue={moneda}
                onValueChange={moneda => obtenerMoneda(moneda)}
                itemStyle={{ height:120 }}
            >
                <Picker.Item label="-- Seleccione --" value="" />
                <Picker.Item label="Dolar de estados unidos" value="USD" />
                <Picker.Item label="Peso mexicano" value="MXN" />
                <Picker.Item label="Euro" value="EUR" />
                <Picker.Item label="Gran Bretaña" value="GBP" />
                <Picker.Item label="Soles Peruanos" value="PEN" />
            </Picker>

            <Text style={styles.label}>Criptomoneda</Text>
            <Picker
                selectedValue={criptomoneda}
                onValueChange={cripto => obtenerCriptomoneda(cripto)}
                itemStyle={{ height:120 }}
            >
                <Picker.Item label="-- Seleccione --" value="" />
                {criptomonedas.map(criptomoneda => (
                    <Picker.Item 
                        key={criptomoneda.CoinInfo.Id} 
                        label={criptomoneda.CoinInfo.FullName}
                        value={criptomoneda.CoinInfo.Name}
                    />
                ))}
                
            </Picker>

            <TouchableHighlight style={styles.btnCotizar} onPress={() => cotizarPrecio()} >
                <Text style={styles.textoCotizar}>Cotizar</Text>
            </TouchableHighlight>
        </View>
    );
}
 
const styles = StyleSheet.create({
    label: {
        fontFamily: "Lato-Black",
        textTransform: "uppercase",
        fontSize: 22,
        marginVertical: 20
    },
    btnCotizar: {
        backgroundColor: "#5e49e2",
        padding: 10,
        marginTop: 20
    },
    textoCotizar: {
        color: "#fff",
        fontSize: 28,
        fontFamily: "Lato-Black",
        textTransform: "uppercase",
        textAlign: "center"
    }
})

export default Formulario;