import React from 'react'

const CardPolitici = React.memo(({ politico }) => {
    console.log(` ${politico.name}`) // Per debug

    return (
        <div className="col-12 col-lg-3 mb-4 p-3">
            <div className="card h-100 shadow">
                <img src={politico.image} className="card-img-top" alt={politico.name} />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{politico.name}</h5>
                    <p className="card-text">{politico.position}</p>
                    <p className="card-text small text-muted">{politico.biography}</p>
                </div>
            </div>
        </div>
    )
})

export default CardPolitici