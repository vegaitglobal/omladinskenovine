import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import SetCookieParser from "set-cookie-parser";


const ContactScreen = () => {
    const [form, setForm] = useState({


    });
    const forms = [
        {
            label: 'Ваше име (обавезно)',
            value: 'your-name'
        },
        {
            label: 'Ваша е-пошта (обавезно)',
            value: 'your-email'
        },
        {
            label: 'Наслов поруке',
            value: 'your-subject'
        },
        {
            label: 'Ваша порука',
            value: 'your-message'
        },
    ]

    const renderInput = ({ label, value }) => (
        <React.Fragment style={{ marginVertical: 10 }}>
            <Text>{label}</Text>
            <TextInput
                style={{ width: '100%', height: 40, borderColor: 'black', borderWidth: 1 }}
                onChangeText={(text) => setForm({ ...form, [`${value}`]: text })}
                value={form[value]}
            />
        </React.Fragment>
    )

    const get_set_cookies = function(headers) {
        const set_cookies = []
        for (const [name, value] of headers) {
            if (name === "set-cookie") {
                set_cookies.push(value)
            }
        }
        return set_cookies
    }

    const sendData = async () => {
        var serializeJSON = function(data) {
            return Object.keys(data).map(function (keyName) {
              return encodeURIComponent(keyName) + '=' + encodeURIComponent(data[keyName])
            }).join('&');
          }
        const data = new FormData()
        data.append('your-name', form['your-name']);
        data.append('your-email', form['your-email'])
        data.append('your-subject', form['your-subject']);
        data.append('your-message', form['your-message'])
        data.append('_wpcf7_nonce', '6afe0e836b')
        
        // const response = await fetch('http://omladinskenovine.rs/', {
        //     method: "GET",
        //     credentials: "same-origin", // or 'include' depending on CORS
        // })
        // console.log(response)
        // const set_cookies = get_set_cookies(response.headers)
        // console.log(set_cookies)
        // const cookies_to_send = set_cookies
        // .map(cookie => {
        //     const parsed_cookie = SetCookieParser.parse(cookie)
        //     return `${cookie.name}=${cookie.value}`
        // })
        // .join('; ')
        // console.log(cookies_to_send)
        let res = await fetch('http://omladinskenovine.rs/wp-json/contact-form-7/v1/contact-forms/186/feedback',
                { 
                headers: {
                    'Cookie': 'PH_HPXY_CHECK=s1; Path=/; Domain=omladinskenovine.rs',
                },
                method: 'POST', 
                body: data  
            })
            console.log(res)
    }

    return (
        <View style={{ flex: 1, marginHorizontal: 15 }}>
            {forms.map(renderInput)}
            <TouchableOpacity
                onPress={() =>
                    sendData()
                }
                style={{ borderWidth: 1, borderColor: 'black', width: '100%', height: 40, alignContent: 'center', alignSelf: 'center', justifyContent: 'center', marginTop: 10 }}
            >
                <Text style={{ textAlign: 'center', fontSize: 20 }}>Пошаљи</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ContactScreen;