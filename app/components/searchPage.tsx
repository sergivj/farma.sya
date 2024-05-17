// app/search/searchPage.tsx
"use client";
import {useRouter, useSearchParams} from 'next/navigation';
import {useState} from "react";

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
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre, type: 'add' }),
            });
        } catch (error) {
            console.log('An error occurred while updating the item');
        }
    }

     const handleSubstract = (nombre: string) => {
         try {
             const response = fetch('/api/farmasya', {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/json',
                 },
                 body: JSON.stringify({ nombre, type: 'substract' }),
             });
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
                           className='w-full flex justify-center mb-3 p-2 rounded-md text-black'
                           type={'text'} placeholder={'Buscar...'} name={'busqueda'} defaultValue={busqueda ? busqueda : ''}
                           onChange={handleSetSearch} />
                    <button className='flex border border-white w-1/2 justify-center p-1 rounded-lg hover:text-black hover:bg-white' type={'submit'}>Buscar</button>
                </form>
                {!noTable ? (
                    <button className='mb-4 mx-4 flex border border-white w-1/2 justify-center p-1 rounded-lg hover:text-black hover:bg-white' type={'submit'} onClick={handleCreate}>+ Añadir medicamento</button>
                ) : null}
            </div>
            {!noTable ? (
                <div className='overflow-auto'>
                <table className="w-screen text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3 text-lg">
                        Nombre
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
                {rows.filter((row: any)=>(busqueda ? row.name.toLowerCase() == busqueda.toLowerCase() : true)).map((row: any) => (
                    <tr key={row.name} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row"
                            className="px-6 py-4 text-nowrap text-lg">
                            {row.name}
                        </th>
                        <td className="px-6 py-4 text-nowrap text-lg">
                            {row.fecha_caducidad}
                        </td>
                        <td className="px-6 py-4 text-nowrap text-lg">
                            {row.cantidad}
                        </td>
                        <td className="px-6 py-4 flex gap-6">
                            <button className='text-nowrap text-lg' type={'button'} onClick={() => handleAdd(row.name)}>Añadir 1</button>
                            <button className='text-nowrap text-lg' type={'button'} onClick={() => handleSubstract(row.name)}>Restar 1</button>
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