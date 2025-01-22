import React from 'react';
import { anime } from 'react-anime';
import "./sky.css";

class StarrySky extends React.Component {
    state = {
        num: 500,
        vw: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
        vh: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
        XRandomStars: [],
        YRandomStars: [],
        YRandomRadius: [],
        XRandomShootingStars: [],
        YRandomShootingStars: [],
    };
    starryNight = () => {
        anime({
            targets: ["#sky .star"],
            opacity: [
                {
                    duration: 700,
                    value: "0"
                },
                {
                    duration: 200,
                    value: "1"
                }
            ],
            easing: "linear",
            loop: true,
            delay: (el, i) => 50 * i
        });
    };
    shootingStars = () => {
        anime({
            targets: ["#shootingstars .wish"],
            easing: "linear",
            loop: true,
            delay: (el, i) => 1000 * i,
            opacity: [
                {
                    duration: 700,
                    value: "1"
                }
            ],
            width: [
                {
                    value: "150px"
                },
                {
                    value: "0px"
                }
            ],
            translateX: 350
        });
    };
    randomRadius = () => {
        return Math.random() * 0.7 + 0.6;
    };
    getRandomX = () => {
        return Math.floor(Math.random() * Math.floor(this.state.vw)).toString();
    };
    getRandomY = () => {
        return Math.floor(Math.random() * Math.floor(this.state.vh)).toString();
    };
    componentDidMount() {
        this.starryNight();
        this.shootingStars();
        this.setState({
            XRandomStars: [...Array(500)].map(() => this.getRandomX()),
            YRandomStars: [...Array(500)].map(() => this.getRandomY()),
            YRandomRadius: [...Array(500)].map(() => this.randomRadius()),
            XRandomShootingStars: [...Array(60)].map(() => this.getRandomX()),
            YRandomShootingStars: [...Array(60)].map(() => this.getRandomY()),
        })
    }
    render() {
        return (
            <div id="App" className='app'>
                <svg id="sky">
                    {[...Array(500)].map((x, y) => (
                        <circle
                            cx={this.state.XRandomStars[y]}
                            cy={this.state.YRandomStars[y]}
                            r={this.state.YRandomRadius[y]}
                            stroke="none"
                            strokeWidth="0"
                            fill="white"
                            key={y}
                            className="star"
                        />
                    ))}
                </svg>
                <div id="shootingstars" className="starsPosition">
                    { [...Array(60)].map((x, y) => (
                        <div
                            key={y}
                            className="wish"
                            style={{
                                left: `${this.state.YRandomShootingStars ? this.state.YRandomShootingStars[y] : 0}px`,
                                top: `${this.state.XRandomShootingStars ? this.state.XRandomShootingStars[y] : 0}px`
                            }}
                        />
                    )) }
                </div>
            </ div>
        );
    }
}

export default StarrySky;