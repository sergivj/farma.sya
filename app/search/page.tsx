import {sql} from "@vercel/postgres";
import SearchPage from "@/app/components/searchPage";

interface SearchPageProps {
    params: string | null;
}

export default async function Search({params}: SearchPageProps) {

    const { rows } = await sql`SELECT * FROM FARMASYA `;

    return (
        <SearchPage rows={rows} />
  );
}
