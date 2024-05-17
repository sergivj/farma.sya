import {sql} from "@vercel/postgres";
import SearchPage from "@/app/components/searchPage";
import {Suspense} from "react";

interface SearchPageProps {
    params: string | null;
}

export default async function Search({params}: SearchPageProps) {

    const { rows } = await sql`SELECT * FROM FARMASYA `;

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchPage rows={rows} />
        </Suspense>
  );
}
