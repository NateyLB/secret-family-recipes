import React from 'react'
import Nav from './Nav.js'

export default function About(){
    return (
        <> 
        <Nav title='The Development Team'/>
        <div class="container">

        <section className="rside">
            <div className="ncard">
                <h2>Dawna Backmeier</h2>
                <a href="https://github.com/karanacesin"><img src={require("../common/dawnabackmeier.jpg")} alt="Dawna with puppy"/></a>
                <p>User Interface/Web Design</p>
            </div>
        </section>

        <section className="lside">
            <div className="ncard">
                <h2>Aldair Balanzar</h2>
                <a href="https://github.com/aldairbalanzar"><img src={require("../common/aldairbalanzar.png")} alt="Aldair Balanzar"/></a>
                <p>Backend Developer</p>
            </div>
        </section>

        <section className="rside">
            <div className="ncard">
                <h2>Angela Laien</h2>
                <a href="https://github.com/angela-laien"><img src={require("../common/angela.png")} alt="Angela"/></a>
                <p>Backend Developer</p>
            </div>
        </section>

        <section className="lside">
            <div className="ncard">
                <h2>Kristian Correa</h2>
                <a href="https://github.com/KristianCorrea"><img src={require("../common/kristian correa.jpg")} alt="Kristian Correa"/></a>
                <p>Frontend Developer</p>
            </div>
        </section>

        <section className="rside">
            <div className="ncard">
                <h2>Nathan Howland</h2>
                <a href="https://github.com/NateyLB"><img src={require("../common/nathanhowland.png")} alt="Nathan Howland"/></a>
                <p>Frontend Developer</p>
            </div>
        </section>

        <section className="lside">
            <div className="ncard">
                <h2>Jay Leach</h2>
                <a href="https://github.com/leachcoding"><img src={require("../common/jayleach.jpg")} alt="Jay in front of the ocean"/></a>
                <p>Project Lead</p>
            </div>
        </section>

    </div>
    </>
    )
}

