import { Image, StyleSheet, TextInput } from 'react-native';
import { Button } from "@/shared/components/atoms/Button";

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';
import { User } from '@prisma/client';

export default function UserScreen() {
    const [name, setName] = useState<User['name']>();
    const [email, setEmail] = useState<User['email']>();
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetch('/api/users', {
            method: 'GET',
        })
            .then((data) => data.json())
            .then((data) => setUsers(data.users as User[]))
            .catch(console.error);
    }, []);

    const onFormSubmit = async () => {
        await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                name,
                email
            }),
        })
            .then((data) => data.json())
            .then(console.log)
            .catch(console.error);

        await fetch('/api/users', {
            method: 'GET',
        })
            .then((data) => data.json())
            .then((data) => setUsers(data.users as User[]))
            .catch(console.error);
    };

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={
                <Image
                    source={require('@/assets/images/partial-react-logo.png')}
                    style={styles.reactLogo}
                />
            }>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Create a user!</ThemedText>
                <TextInput style={styles.textInput} autoComplete={'name'} placeholder={"Name"} onChangeText={setName} />
                <TextInput style={styles.textInput} autoComplete={'email'} placeholder={"Email"} onChangeText={setEmail} />
                <Button onPress={onFormSubmit} ariaLabel={"Submit new user form."} label={"Submit"} />
            </ThemedView>
            <ThemedView>
                {users.map((user) => (
                    <ThemedText key={user.id}>
                        {user.name} - {user.email}
                    </ThemedText>
                ))}
            </ThemedView>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'column',
        gap: 16,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
    textInput: {
        color: 'white'
    }
});
