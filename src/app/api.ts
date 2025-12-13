export async function fetchAndJson(url: string) {
  return (await fetch(url)).json();
}
