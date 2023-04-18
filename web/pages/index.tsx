export default function Index() {
  return null;
}

export async function getStaticProps() {
  const lat = 48.704301;
  const lng = -3.97298;

  const start = new Date().toISOString();
  const end = new Date(
    new Date().getTime() + (24 / 10) * 60 * 60 * 1000
  ).toISOString();

  const url = `https://api.stormglass.io/v2/tide/extremes/point?lat=${lat}&lng=${lng}&start=${start}&end=${end}`;

  const response = await fetch(url, {
    headers: {
      Authorization:
        "3e4b7144-665c-11ed-b59d-0242ac130002-3e4b71a8-665c-11ed-b59d-0242ac130002",
    },
  });
  const json: { data: [{ sg: number; time: string }] } = await response.json();

  const seaLevel =
    json.data?.reduce((prev, curr) => (prev + curr.sg) / 2, 1) || 1;

  return {
    props: {
      seaLevel,
    },
    revalidate: (60 * 60 * 24) / 10,
  };
}
