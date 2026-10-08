// CUTBER - DEMO BERBER VERİLERİ

const cities = {
    "İstanbul": [
        "Kadıköy", "Üsküdar", "Beşiktaş",
        "Şişli", "Bakırköy", "Ataşehir"
    ],
    "Kocaeli": [
        "İzmit", "Gebze", "Gölcük", "Körfez"
    ],
    "Ankara": [
        "Çankaya", "Keçiören", "Etimesgut"
    ],
    "İzmir": [
        "Karşıyaka", "Bornova", "Konak"
    ],
    "Bursa": [
        "Nilüfer", "Osmangazi", "Yıldırım"
    ]
};

const barberNames = [
    "Royal Barber", "The Gentlemen", "Black Cut",
    "Elite Barber", "Makas Studio", "Prestige Hair",
    "Urban Barber", "Classic Cut", "King Barber",
    "Modern Style"
];

const cityDistribution = [
    ...Array(10).fill("İstanbul"),
    ...Array(5).fill("Kocaeli"),
    ...Array(4).fill("Ankara"),
    ...Array(3).fill("İzmir"),
    ...Array(3).fill("Bursa")
];

const barbers = cityDistribution.map((city, index) => {

    const districts = cities[city];

    return {
        id: index + 1,
        name: barberNames[index % barberNames.length]
            + " " + (Math.floor(index / 10) + 1),

        city: city,
        district: districts[index % districts.length],

        rating: Number((4.0 + (index % 10) / 10).toFixed(1)),
        reviewCount: 25 + index * 7,

        image: `images/barber${(index % 5) + 1}.jpg`,

        services: [
            {
                name: "Saç Kesimi",
                price: 250 + (index % 5) * 50,
                duration: 30
            },
            {
                name: "Sakal Tıraşı",
                price: 150 + (index % 4) * 25,
                duration: 20
            },
            {
                name: "Saç + Sakal",
                price: 400 + (index % 5) * 50,
                duration: 50
            }
        ],

        workingHours: {
            start: "09:00",
            end: "20:00"
        },

            isDemo: true,

        employees: [
            {
                id: (index * 2) + 1,
                name: [
                    "Ahmet Yılmaz", "Mehmet Demir",
                    "Emre Kaya", "Burak Çelik",
                    "Mert Şahin", "Can Arslan",
                    "Kerem Aydın", "Oğuz Yıldız",
                    "Eren Koç", "Onur Özdemir"
                ][(index * 2) % 10],
                rating: Number((4.5 + (index % 5) * 0.1).toFixed(1)),
                isDemo: true
            },
            {
                id: (index * 2) + 2,
                name: [
                    "Ahmet Yılmaz", "Mehmet Demir",
                    "Emre Kaya", "Burak Çelik",
                    "Mert Şahin", "Can Arslan",
                    "Kerem Aydın", "Oğuz Yıldız",
                    "Eren Koç", "Onur Özdemir"
                ][(index * 2 + 1) % 10],
                rating: Number((4.1 + (index % 5) * 0.1).toFixed(1)),
                isDemo: true
            }
        ]
    };
});

console.log("Cutber demo berber sayısı:", barbers.length);
