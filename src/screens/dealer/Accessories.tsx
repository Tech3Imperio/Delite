"use client"

import React, { useEffect, useState } from 'react'
import { Wrapper } from '../../lib/Wrapper'
import { AccessoriesCard, Accessory } from '../../components/dealer/cards/AccessoriesCard'
import { getApiBaseUrl } from '../../utils/auth/baseAPI'
import { FlatList } from 'react-native'

const Accessories = () => {
    const [accessories, setAccessories] = useState<Accessory[] | null>(null)

    useEffect(() => {
        const fetchAccessories = async () => {
            try {
                const response = await fetch(`${getApiBaseUrl()}/accessories`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                const result = await response.json()
                if (result) {
                    setAccessories(result.data)
                    console.log("These are the accessories:", result.data)
                }
            } catch (error) {
                if (error instanceof Error) {
                    console.error("Accessories Error", error.message)
                } else {
                    console.error("Some Error", error)
                }
            }
        }

        fetchAccessories()
    }, [])
    console.log(accessories)
    if (accessories !== null) {
        return (
            <Wrapper>
                <FlatList data={accessories} style={{ height: "100%" }} showsVerticalScrollIndicator={false} renderItem={({ item }) => <AccessoriesCard accessory={item} />} keyExtractor={item => item.code} contentContainerStyle={{
                    display: 'flex',
                    gap: 20
                }} />
            </Wrapper>
        )
    }
}

export default Accessories
