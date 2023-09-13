import { FAUNA_SECRET } from '$env/static/private';
import { Client, fql } from 'fauna';
export { FAUNA_SECRET } from '$env/static/private';


const client = new Client({secret: FAUNA_SECRET});

try {
	const collection_query = fql`Collection.create({ name: "matches" })`;
	const collection_result = await client.query(collection_query);
	console.log(collection_result);

	const firstMatch = { name: 'my first match' };
	const document_query = fql`matches.create(${firstMatch}) { id, ts, name }`;
	const document_result = await client.query(document_query);
	console.log(document_result);
} catch (error) {
	console.log(error);
}
