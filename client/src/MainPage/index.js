import React, { Component } from 'react';

import styles from './index.module.scss';


const vkAlenaLink = 'https://vk.com/alenafilatowa';
const domen = 'http://localhost:5000';
const man = 'мужчина';
const woman = 'женщина';

class MainPage extends Component {
    state = {
        productsMan: [],
        productsWoman: [],
    };

    componentDidMount() {
        fetch(`${domen}/api/products?sex=${man}`).then(res => {
            if(!res && res.status !== 200) {
                return;
            }
            res.json().then((res) => {
                this.setState({productsMan: res});
            });
        });

        fetch(`${domen}/api/products?sex=${woman}`).then(res => {
            if(!res && res.status !== 200) {
                return;
            }
            res.json().then((res) => {
                this.setState({productsWoman: res});
            });
        });
    }

    render() {
        const { productsMan, productsWoman } = this.state;

        return (
            <div className={styles.root}>
                <div className={styles.top}>
                    <div className={styles.client}>
                        <a href={vkAlenaLink}>Филатова Алена :)</a>
                    </div>
                    <div className={styles.title}>
                        Добро пожаловать к Алене!
                    </div>
                    <div className={styles.subtitle}>
                        Лучший интернет магазин по продаже обуви
                    </div>
                    <div className={styles.showProducts}>
                        Просмотреть асортимент
                    </div>
                </div>
                <div className={styles.products}>
                    <div className={styles.category}>
                        <div className={styles.categoryName}>Мужчинам</div>
                        <div className={styles.productsImages}>
                            {
                                productsMan.slice(0, 4).map((value, key) => {
                                    return (
                                        <div key={key} className={styles.product}>
                                            <img src={value.image} alt={value.name} />
                                            <div>{value.name}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className={styles.category}>
                        <div className={styles.categoryName}>Женщинам</div>
                        <div className={styles.productsImages}>
                            {
                                productsWoman.slice(0, 4).map((value, key) => {
                                    return (
                                        <div key={key} className={styles.product}>
                                            <img src={value.image} alt={value.name} />
                                            <div>{value.name}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainPage;