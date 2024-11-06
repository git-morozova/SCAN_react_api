const _items = [
    {
        id: '0',
        tariff: 'Beginner',
        desc: 'Для небольшого исследования',
        image: '../src/assets/img/icons/tariff_lamp.svg',
        color: '#FFB64F',
        colorHeader: '#000000',
        price: '799',
        price_strike: '1\u00a0200',
        installment_info: 'или 150 ₽/мес. при рассрочке на 24 мес.',
        info_list: [
            'Безлимитная история запросов',
            'Безопасная сделка',
            'Поддержка 24/7'
        ]
    },

    {
        id: '1',
        tariff: 'Pro',
        desc: "Для HR и\u00a0фрилансеров",
        image: '../src/assets/img/icons/tariff_target.svg',
        color: '#7CE3E1',
        colorHeader: '#000000',
        price: '1\u00a0299',
        price_strike: '2\u00a0600',
        installment_info: 'или 279\u00a0₽/мес. при\u00a0рассрочке на\u00a024\u00a0мес.',
        info_list: [
            'Все пункты тарифа Beginner',
            'Экспорт истории',
            'Рекомендации по приоритетам'
        ]
    },

    {
        id: '2',
        tariff: 'Business',
        desc: 'Для корпоративных клиентов',
        image: '../src/assets/img/icons/tariff_laptop.svg',
        color: '#000000',
        colorHeader: '#ffffff',
        price: '2\u00a0379',
        price_strike: '3\u00a0700',
        installment_info: '',
        info_list: [
            'Все пункты тарифа Pro',
            'Безлимитное количество запросов',
            'Приоритетная поддержка'
        ]
    },
];

export default _items