import React from "react"
import { Container } from 'semantic-ui-react'


function Home() {
    return(
        <div>
            <Container  fluid style= {{ backgroundColor: 'rgba(52, 52, 52, 0.8)', padding: '10px' }}>

            <h1>What is Herbalism? </h1>
            <p style = {{ fontSize: '16pt' }}>Herbalism is a time-honored practice that harnesses the healing power of plants to promote well-being and vitality. For centuries, herbalists have studied the unique properties of herbs and plants, using them to create natural remedies for a wide range of health concerns. From soothing herbal teas to potent tinctures, herbalism offers a holistic approach to health that focuses on the intricate connection between nature and the human body.</p>
            <h1>Why Herbalism Matters</h1>
            <p style = {{ fontSize: '16pt' }}>Herbalism empowers individuals to take control of their health and connect with the natural world. Unlike many conventional approaches, herbalism offers gentle, yet effective, solutions that work in harmony with the body. It's a sustainable and eco-friendly practice that respects the environment and supports local communities. By embracing herbalism, you can explore the profound impact that nature's bounty can have on your health and well-being. Of course, you should always consult with your doctor before making big changes to your daily medicine regiment.</p>
            <h1>How can Holistic Home Herbalist Help?</h1>
            <p style = {{ fontSize: '16pt' }}>Holistic Home Herbalist is a unique platform designed to simplify your herbal journey. Here, you can explore a vast collection of herbs, their properties, and practical applications. Use our search feature to discover the right herbs for your specific needs, whether it's for relaxation, immune support, or vitality. Dive into detailed dosage information and herb properties. Add new herbs and share recipes you've used with other users. Embrace the wisdom of herbalism and begin your journey toward a healthier, more balanced life.</p>
            </Container>
        </div>
    )
}

export default Home