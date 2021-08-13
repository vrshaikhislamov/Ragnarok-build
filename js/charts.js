const barOptions = {
    type: 'bar',
    data: null,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    },
};

const getRadarStats = (hero) => {
    return {
        type: 'radar',
        data: {
            labels: [
                'Str',
                'Vit',
                'Luk',
                'Int',
                'Dex',
                'Agi'
            ],
            datasets: [{
                label: 'Базовые характеристики',
                data: [hero._base.str, hero._base.vit, hero._base.luk, hero._base.int, hero._base.dex, hero._base.agi],
                fill: true,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                pointBackgroundColor: 'rgb(255, 99, 132)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(255, 99, 132)'
            }
        ]
        },
        options: {
            responsive:false,
            maintainAspectRatio: true,
            elements: {
                line: {
                    borderWidth: 3
                }
            }
        },
    }; 
}

const refreshStatsChart = (chart, hero) => {
    chart.data.datasets[0].data = [hero._base.str, hero._base.vit, hero._base.luk, hero._base.int, hero._base.dex, hero._base.agi];
    chart.update();
}