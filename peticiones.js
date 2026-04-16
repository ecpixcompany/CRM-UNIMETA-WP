// aqui consultamos la informacion
export async function ObtenerEstadosLeads() {
  // hacer solicitud a la api de strapiasas
  const response = await fetch("https://strapi.ecpixcompany.com/api/estados", {
    method: "GET",
    headers: {
      Authorization:
        "Bearer 5df1a9e637ed81c2589aa624497e41847e16c0547f832c4c84fdf82ffca7f01a0d4fa06b789b5fa4367e4ead39c18d24748e847076b2b0579a0f92607fe1be09419c0fc880acecd1aa9c2c4994eebd698bfe0cc12634066204738ab1e542d20be4ba6dd1f06b48af303638dd7b43df0b3df175422d8a6a7185a49a1d22a4ec9b",
    },
  });
  // convertir en json
  const data = await response.json();
  // voy a consologear data
  return data;
}

ObtenerEstadosLeads();
