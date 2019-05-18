import React, { Component } from 'react';

import styles from './index.module.scss';


const vkAlenaLink = 'https://vk.com/alenafilatowa';

class MainPage extends Component {
    render() {
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
            </div>
        );
    }
}

export default MainPage;