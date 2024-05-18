// app/search/searchPage.tsx
"use client";
import {useRouter, useSearchParams} from 'next/navigation';
import {useState} from "react";

export const fetchCache = "force-no-store";
const SearchPage = ({rows, noTable=false}: any) => {
    const searchParams = useSearchParams();
    const busqueda = searchParams.get('busqueda');
    const router = useRouter();
    const [search, setSearch] = useState('')
    const handleClick = () => {
        router.push(`/search?busqueda=${search}`);
    }

    const handleCreate = () => {
        window.location.href = '/create';
    }

    const handleAdd = (nombre: string) => {
        try {
            const response = fetch('/api/farmasya', {
                method: 'POST',
                cache: 'no-store',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre, type: 'add' }),
            });
            router.refresh();
        } catch (error) {
            console.log('An error occurred while updating the item');
        }
    }

     const handleSubstract = (nombre: string) => {
         try {
             const response = fetch('/api/farmasya', {
                 method: 'POST',
                 cache: 'no-store',
                 headers: {
                     'Content-Type': 'application/json',
                 },
                 body: JSON.stringify({ nombre, type: 'substract' }),
             });
             router.refresh();
         } catch (error) {
             console.log('An error occurred while deleting the item');
         }
    }

    const handleDelete = (nombre: string) => {
        try {
            const response = fetch('/api/farmasya', {
                method: 'POST',
                cache: 'no-store',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre, type: 'delete' }),
            });
            router.refresh();
        } catch (error) {
            console.log('An error occurred while updating the item');
        }
    }

    const handleSetSearch = (e: any) => {
        setSearch(e.target.value)
    }

    return (
        <div className="relative">
            <div className='w-full flex flex-col gap-4'>
                <form className='w-full flex flex-col px-6 pb-6 items-center justify-center' onSubmit={handleClick}>
                    <input
                           className='bg-color-primary border border-color-secondary w-2/3 flex justify-center mb-3 p-2 rounded-md text-black font-bold placeholder:font-semibold placeholder-black'
                           type={'text'} placeholder={'Buscar...'} name={'busqueda'} defaultValue={busqueda ? busqueda : ''}
                           onChange={handleSetSearch} />
                    <button className='flex border border-color-secondary w-1/6 justify-center p-2 rounded-lg bg-color-primary hover:bg-[#F1F1F2] font-semibold' type={'submit'}>Buscar</button>
                </form>
                {!noTable ? (
                    <button className='mb-4  flex border border-color-secondary md:w-1/5 lg:w-1/5 w-1/2 justify-center p-2 rounded-lg bg-color-primary hover:bg-[#F1F1F2] font-semibold' type={'submit'} onClick={handleCreate}>+ Añadir medicamento</button>
                ) : null}
            </div>
            {!noTable ? (
                <div className='overflow-auto'>
                <table className="w-screen text-sm text-left rtl:text-right text-black border-y-2 border-color-secondary">
                <thead className="text-xs text-black uppercase bg-color-primary ">
                <tr>
                    <th scope="col" className="px-6 py-3 text-lg">
                        Nombre
                    </th>
                    <th scope="col" className="px-6 py-3 text-lg">
                        Descripción
                    </th>
                    <th scope="col" className="px-6 py-3 text-lg text-nowrap">
                        Fecha caducidad
                    </th>
                    <th scope="col" className="px-6 py-3 text-lg">
                        Cantidad
                    </th>
                    <th scope="col" className="px-6 py-3 text-lg">
                        Acción
                    </th>
                </tr>
                </thead>
                <tbody className='overflow-auto'>
                {rows.sort((a: any, b: any) => a.name.localeCompare(b.name)).filter((row: any)=>(busqueda ? row.name.toLowerCase() == busqueda.toLowerCase() : true)).map((row: any) => (
                    <tr key={row.name} className={`border-b ${row.cantidad <= 0 ? 'bg-red-300' : 'bg-white'} `}>
                        <th scope="row"
                            className="px-6 py-4 text-nowrap text-lg">
                            {row.name}
                        </th>
                        <td className="px-6 py-4 text-nowrap text-lg">
                            {row.description}
                        </td>
                        <td className="px-6 py-4 text-nowrap text-lg">
                            {row.fecha_caducidad}
                        </td>
                        <td className="px-6 py-4 text-nowrap text-lg">
                            {row.cantidad}
                        </td>
                        <td className="px-6 py-4 flex gap-6">
                            <button className='text-nowrap text-lg rounded border border-black px-2' type={'button'} onClick={() => handleAdd(row.name)}>Añadir 1</button>
                            <button className='text-nowrap text-lg rounded border border-black px-2' type={'button'} onClick={() => handleSubstract(row.name)}>Restar 1</button>
                            <button className='text-nowrap text-lg rounded border border-black px-2 bg-red-600 text-white' type={'button'} onClick={() => handleDelete(row.name)}>Eliminar</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
            ) : null}
        </div>
    );
};

export default SearchPage;