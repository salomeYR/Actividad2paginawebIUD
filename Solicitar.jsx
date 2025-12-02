import { useState, useEffect } from "react";
import {useLocation, useNavigate} from 'react-router-dom';
import { creditdata } from "../data/creditdata";
import './Solicitar.css';

function Solicitar(){
    const location =useLocation();
    const navigate=useNavigate();
    const creditoPreseleccionado = location.state?.creditType;

    //item del fomulario
    const [formData, setFormData]=useState ({
        nombre: '',
        cedula: '',
        telefono: '',
        tipoCredito: creditoPreseleccionado?.tipo || '',
        monto: '',
        plazo: '',
        destino: '',
        empresa: '',
        cargo: '',
        ingresos: '',
    })
    const [coutaMensual, setCoutaMensual]=useState(0);
    const [errores, setErrores]= useState({});
    const [mostrarResumen, setMostrarResumen]= useState(false);
    const [solicitudes, setSolicitudes]=useState([]);

    useEffect(()=>{
        if (formData.monto && formData.plazo && formData.tipoCredito){
            const credito=creditdata.find(c.tipo=== formData-tipoCredito);
            if (credito) {
                const tasaMensual =credito.tasainteres/100;
                const monto= parseFloat(formData.monto);
                const plazo= parseInt(formData.plazo);

                const cuota= monto*(tasaMensual* Math.pow (1+tasaMensual, plazo))/
                        (math.pow(1+tasaMensual, plazo)-1);
                setCoutaMensual(couta);
            }
        }
    }, [formData.monto, formData.plazo, formData.tipoCredito]);

    const handleChange = (e)=>{
        const{name, value}=e.target;
        setFormData(prev => ({
            ...prev,
            [name]: ''
        }));
        if (errores[name]){
            setErrores(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    }
};

const validarFormulario = ()=>{
    const nuevosErrores={};

    if (!formData.nombre.trim()){
        nuevosErrores.nombre='el nombre es oblicatorio';
    }
    if (!formData.cedula || formData.cedula-length<6){
        nuevosErrores.cedula='cedula invalida';
    }
    if (!formData.telefono || formData.telefono.length <10){
        nuevosErrores.telefono='invalido';
    }
    if (!formData.tipoCredito.trim()){
        nuevosErrores.tipoCredito='seleccion el tipo de credito';
    }

    const credito=creditdata.find(c=> c.tipo===formData.tipoCredito);
    if (credito){
        const monto = parseFloat(formData.monto);
        if (!mono ||mono < credito.min_monto|| monto>credito.max_monto){
            nuevosErrores.monto='monto debe esra entre ${formatCurrency(credito.min_monto)} y ${formatCurrency(credito.max_monto)}';
        }
        const plazo =parseInt(formData.plazo);
        if (!plazo || plazo < 1 || plazo > credito.max_time){
            nuevosErrores.plazo='plazo debe estar entre 1 y ${credito.max_time}';
        }
    }
    if (!formData.destino.trim()){
        nuevosErrores.desino='el desino es obligatorio';
    }
    if (!formData.empresa.trim()){
        nuevosErrores.empresa='la empresa es obigatorio';
    }
    if (!formData.cargo.trim()){
        nuevosErrores.cargo='el cargo es obligatorio';
    }
    const ingresos = parseFloat(formData.ingresos);
    if (!ingresos || ingresos <1000000){
        nuevosErrores.ingresos='los ingreos deben ser mayores'
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length===0;
};

const handleSubmit =(e)=>{
    e.preventDefault();
    if (validarFormulario()){
        setMostrarResumen(true);
    }
};

const confirmarSolicitud =()=>{
    const nuevaSolicitud ={
        id:Date.now(),
        ...formData,
        cuotaMensual,
        fecha: new Date().toLocaleString('es-CO')
    };

    setSolicitudes(prev=>[...prev, nuevaSolicitud]);
    alert('soliciud enviada con exito')

    //limpiar fomrulario
    setFormData({
        nombre: value,
        cedula: '',
        telefono: '',
        tipoCredito:'',
        monto: '',
        plazo: '',
        destino: '',
        empresa: '',
        cargo: '',
        ingresos: '',
    })
    setCoutaMensual(0);
    setMostrarResumen(false);

    // dirigr a la pagina de inicio
    navigate('/');
};

const creditoSeleccionado=creditdata.find(c=>c.tipo===formData.tipoCredito);
return(
    <div className="solicitar-page">
        <div className="container">
            <h1>solicitud credito</h1>
            <p className="subtitle">complete fomrulario</p>

            {!mostrarResumen?(
                <form onSubmit={handleSubmit} className="form-solicitud">
                    {/*datos personales*/}
                    <div className="form-section">
                        <h2>
                            <span className="section-icon">👤</span>
                            datos personales
                        </h2>
                        <div className="form-grid">
                            <div className="form-group">
                                <label> nombre completo</label>
                                <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="juan peres" />
                                {errores.nombre && <span className="error">{errores.nombre}</span>}
                            </div>
                            <div className="form-group">
                                <label> cedula</label>
                                <input type="number" name="cedula" value={formData.cedula} onChange={handleChange} placeholder="1234567890" />
                                {errores.cedula && <span className="error">{errores.cedula}</span>}
                            </div>
                            <div className="form-group">
                                <label> telefono</label>
                                <input type="number" name="telefono" value={formData.telefono} onChange={handleChange} placeholder="12345678890" />
                                {errores.telefono && <span className="error">{errores.telefono}</span>}
                            </div>
                        </div>
                    </div>

                    {/*tipo credito*/}
                    <div className="form-section">
                        <h2><span className="section-icon">💳</span>tipo credito</h2>

                        <div className="form-grid">
                            <div className="form-groupfull-width">
                                <label>tipo de credito</label>
                                <select name="tipoCredito" value= {formData.tipoCredito} onChange={handleChange}>
                                    <option value="">--selecciona una opsion--</option>
                                    {creditdata.map(credit=>(
                                        <option key={credit.id} value={credit.tipo}>
                                            {credit.icono}{credit.nombre}
                                        </option>
                                    ))}
                                </select>
                                {errores.tipoCredito && <span className="error">{errores.tipoCredito}</span>}
                            </div>
                            {creditoSeleccionado && (
                                <div className="info-credito">
                                    <p><strong>tasa: </strong>{creditoSeleccionado.tasainteres}%mensual</p>
                                    <p><strong>monto: </strong>{formatCurrency(creditoSeleccionado.min_monto)}-{formatCurrency(creditoSeleccionado.max_monto)}</p>
                                    <p><strong>plazo: </strong>{creditoSeleccionado.max_time} meses</p>
                                </div>
                            )}

                            <div className="form-group">
                                <label>monto solicitado</label>
                                <input type="number" name="mono" value={formData.monto} onChange={handleChange} placeholder="500000" />
                                {errores.monto && <span className="error">{errores.monto}</span>}
                            </div>
                            <div className="form-group">
                                <label>plazo</label>
                                <input type="number" name="plazo" value={formData.plazo} onChange={handleChange} placeholder="12" />
                                {errores.plazo && <span className="error">{errores.plazo}</span>}
                            </div>
                            {coutaMensual >0 &&(
                                <div className="cuota-estimada">
                                    <strong>couta mensual estimada</strong>
                                    <span className="cuota-valor">{formatCurrency(cuotaMensual)}</span>
                                </div>
                            )}

                            <div className="form-group ful-width">
                                <label>Destino del credito</label>
                                <input type="text" name="destino" value={formData.destino} onChange={handleChange} placeholder="vivienda" />
                                {errores.destino && <span className="error">{errores.destino}</span>}
                            </div>
                        </div>
                    </div>

                    {/*datos laborales*/}
                    <div className="form-section">
                        <h2><span className="section-icon">💼</span>datos laborales</h2>
                        <div className="form-grid">
                            <div className="form-group full-width">
                                <label>empresa</label>
                                <input type="text" name="empresa" value={formData.empresa} onChange={handleChange} placeholder="empresa" />
                                {errores.empresa && <span className="error">{errores.empresa}</span>}
                            </div>
                            <div className="form-group">
                                <label>cargo</label>
                                <input type="text" name="cargo" value={formData.cargo} onChange={handleChange} placeholder="labor" />
                                {errores.cargo && <span className="error">{errores.cargo}</span>}
                            </div>
                            <div className="form-group">
                                <label>ingresos</label>
                                <input type="number" name="ingresos" value={formData.ingresos} onChange={handleChange} placeholder="1000000" />
                                {errores.ingresos && <span className="error">{errores.ingresos}</span>}
                            </div>
                        </div>
                    </div>
                    <div className="button-container">
                        <button type="submit" className="btn-primary">ver resumen</button>
                        <button type="button" onClick={()=>navigate('/')} className="btn-secondary">cancelar</button>
                    </div>
                </form> 
            ):(
                <div className="resumen soliciud">
                    <h2>resumen</h2>
                    <div className="resumen-section">
                        <h3>datos personales</h3>
                        <p><strong>nombre</strong>{formData.nombre}</p>
                        <p><strong>cedula</strong>{formData.cedula}</p>
                        <p><strong>telefono</strong>{formData.telefono}</p>
                    </div>
                    <div className="resumen-section">
                        <h3>credito</h3>
                        <p><strong>tipo</strong>{creditoSeleccionado?.nombre}</p>
                        <p><strong>monto</strong>{formatCurrency(parseFloat(formData.monto))}</p>
                        <p><strong>plazo</strong>{formData.plazo}meses</p>
                        <p><strong>cuota</strong>{formatCurrency(cuotaMensual)}meses</p>
                        <p><strong>destino</strong>{formData.destino}</p>
                    </div>
                    <div className="resumen-section">
                        <h3>datos laborales</h3>
                        <p><strong>empresa</strong>{formData.empresa}</p>
                        <p><strong>cargo</strong>{formData.cargo}</p>
                        <p><strong>ingresos</strong>{formatCurrency(parseFloat(formData.ingresos))}</p>
                    </div>

                    <div className="button-container">
                        <button onClick={confirmarSolicitud} className="btn-primary">enviar</button>
                        <button onClick={()=>setMostrarResumen(false)} className="btn-secondary">volver</button>
                    </div>
                </div>

            )}
        </div>
    </div>
);
export default Solicitar;
