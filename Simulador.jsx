import { useState, useEffect} from "react";
import CreditCard from "../components/CreditCard";
import { creditdata } from "../data/creditdata";
import './Simulador.css';


const [ordenTasa, setOrdenTasa] = useState('ninguno');

function Simulador(){
    const [credits, setcredits]=useState(creditdata);
    const [searchTerm, setSearchTerm]=useState('');
    const [montoFiltro, setMontofiltro]=useState('todos');
    const [resultados, setresultados]=useState(creditdata);

    useEffect(()=>{
        let filtered=[...credits];
//filtros por rango de nombres
        if (searchTerm){
            filtered=filtered.filter(credit =>
                credit.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                credit.tipo.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        // filtros por rango de numeros
        if (montoFiltro!=='todos'){
            filtered=filtered.filter(credit=>{
                switch(montoFiltro){
                    case 'bajo':
                        return credit.max_monto<=10000000;
                    case 'medio':
                        return credit.max_monto >10000000 && credit.min_monto<=50000000;
                    case 'alto':
                        return credit.max_monto>50000000;
                    default:
                        return true;
                }
            });
        }

        // ordenar por tasa de interes
        if (ordenTasa === 'menor-mayor'){
            filtered.sort((a,b)=>a.tasainteres - b.tasainteres);
        }else if (ordenTasa==='mayor-menor'){
            filtered.sort((a,b)=> b.tasainteres - a.tasainteres);
        }
        setresultados(filtered);
    }, [searchTerm, montoFiltro, ordenTasa, credits]);

    //para limpiar filtro---------------------------------

    const limpiarfiltros =()=>{
        setSearchTerm('');
        setMontofiltro('todos');
        setOrdenTasa('ninguno');
    }
    return(
        <div className="simulador-page">
            <div className="container">
                <h1>simulador de creditos</h1>
                <p className="subtitle"> encuentra el credito perfecto</p>
            

                {/*filtro*/}
                <div className="filtros-container">
                    <div className="filtro-group">
                        <label>bucar por nombre</label>
                        <input type ="text" placeholder="Ej: hoga, academico, vehiculo.." value={searchTerm} onChange={(e)=> setSearchTerm(e.target.value)} className="input-search"></input>
                    </div>
                    <div className="filtro-group">
                        <label>💰ragon de monto</label>
                        <select value={montoFiltro} onChange={(e)=> setMontofiltro(e.target.value)} className="select-filter">
                            <option value="todos">todos los montos</option>
                            <option value="bajo">hasta 10M</option>
                            <option value="medio">10M-50M</option>
                            <option value="alto">mas de 50M</option>
                        </select>
                    </div>
                    <button onClick={limpiarfiltros} className="btn-limpiar">limpiar</button>
                </div>
                {/*reultados*/}
                <div className="resultados-info">
                    <p>se encontraron  <strong>{resultados.length}</strong> creditos</p>
                </div>
                {resultados.length > 0 ?(
                    <div className="credits-grid">
                        {resultados.map((credit)=>(
                            <CreditCard key={credit.id} credit={credit}/>
                        ))}
                    </div>
                ):( 
                    <div className="no-resultados">
                        <span className="icon-empty">😞</span>
                        <h3>no hay creditos disponibles</h3>
                        <p>ajusta los filtros</p>
                        <button onClick={limpiarfiltros} className="btn-primary">restablecer filtros</button>
                    </div>
                )}
            </div>
        </div>
    );
}
