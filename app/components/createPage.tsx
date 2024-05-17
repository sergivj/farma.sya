// app/search/searchPage.tsx
"use client";
import {useRouter} from 'next/navigation';
import {useState} from "react";

export const fetchCache = "force-no-store";
const AddPage = () => {
    const router = useRouter();
    const [nombre, setNombre] = useState('')
    const [fecha, setFecha] = useState('')
    const [cantidad, setCantidad] = useState('')

    const handleNombre = (e: any) => {
        setNombre(e.target.value)
    }

    const handleFecha = (e: any) => {
        setFecha(e.target.value)
    }

    const handleCantidad = (e: any) => {
        setCantidad(e.target.value)
    }


     const handleClick = () => {
         try {
             console.log(nombre, fecha, cantidad)
             const response = fetch('/api/farmasya_add', {
                 method: 'POST',
                 cache: 'no-store',
                 headers: {
                     'Content-Type': 'application/json',
                 },
                 body: JSON.stringify({ nombre, fecha, cantidad}),
             });
         } catch (error) {
             console.log('An error occurred while updating the item');
         }
         router.push('/search');
    }

    return (
        <div className="relative overflow-x-none lg:overflow-x-auto">
            <h2 className='font-extrabold uppercase flex justify-center pb-5 text-xl'> Añadir nuevo medicamento</h2>
            <form action={handleClick} className='flex flex-col gap-4 p-4'>
                <input className='p-4 rounded-md text-black' type={'text'} placeholder={'Nombre'} name={'nombre'} onChange={handleNombre}/>
                <input className='p-4 rounded-md text-black' type={'text'} placeholder={'Fecha de Caducidad'} name={'fecha'} onChange={handleFecha}/>
                <input className='p-4 rounded-md text-black' type={'number'} placeholder={'Cantidad'} name={'cantidad'} onChange={handleCantidad}/>
                <button className='border border-white p-2 rounded-3xl' type={'submit'}>Enviar</button>
            </form>
        </div>
    );
};

export default AddPage;