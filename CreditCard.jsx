import React from 'react'
import{Link} from 'react-router-dom';
import './CreditCard.css';

{/*export const CreditCard =() => {
    const{
        name,
        descripcion,
        min_monto,
        max_monto,
        tasainteres,
        max_time,
        requerimientos,
        icon,

    } = credit;
    
    return(
        <div className='credit-card'>
            <div className='card-header'>
                <span className='icon'>{icon}</span>
                <h4>{name}</h4>
            </div>
            <p className='descripcion'>{descripcion}</p>

            <div className='details'>
                <div className='detail-item'>
                    <span className='label'>taza interes</span>
                    <span className='value'>{tasainteres}</span>
                </div>

                <div className='detail-item'>
                    <span className='label'>monto</span>
                    <span className='value'>{formatcurrency(min_monto) - formatcurrency(max_monto)}</span>
                </div>

                <div className='detail-item'>
                    <span className='label'>plazo</span>
                    <span className='value'>hasta {max_time}</span>
                </div>
            </div>
            
            <button className='btn-primary'>solicitar</button>
            <link to="/solicitar" {{creditType: credit}} className='btn-primary'>solicitar</link>
        </div>
    )
}*/}

function CreditCard({credit}){
    const formatcurrency=(amount)=>{
        return new Intl.NumberFormat('es-CO',{
            style: 'currency',
            currency:'COP',
            minimumFractionDigits:0
        }).format(amount);
    };
    return(
        <div className='credit-card'>
            <div className='credit-icon'>{credit.icon}</div>
            <h3>{credit.nombre}</h3>
            <p className='credit-descripcion'>{credit.descripcion}</p>

            <div className='credit-details'>
                <div className='detail-item'>
                    <span className='label'> tasa de interes</span>
                    <span className='value highlight'>{credit.tasainteres}% mensual</span>
                </div>
                <div className='detail-item'>
                    <span className='label'>monto</span>
                    <span className='value'>{formatcurrency(credit.min_monto)}-{formatcurrency(credit.max_monto)}</span>
                </div>
                <div className='detail-item'>
                    <span className='label'>plazo</span>
                    <span className='value'>hasta {credit.max_time/12}años</span>
                </div>
            </div>
            <Link to="/solicitar" state={{creditType: credit}} className='btn-primary'>solicitar</Link>
        </div>
    );
}
export default CreditCard;