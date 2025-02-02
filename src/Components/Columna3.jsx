import React from 'react'
import HorizontalBarChart from './HorizontalBarChart.jsx'
import GastosComparativa from './GastosComparativa.jsx'


const Columna3 = ({gastos,categoriasTotales}) => {
  return (
    <div className='w-full  flex flex-col'>

        <GastosComparativa  gastos = {gastos}/>
        <HorizontalBarChart categoriasTotales = {categoriasTotales}/>
        
      
    </div>
  )
}

export default Columna3
