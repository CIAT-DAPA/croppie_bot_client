

interface ChatFormData {
    inputData: string;
    message: string;
    isLoading: boolean;
    sendData: () => void;
}

export const chatForm = (): ChatFormData => {

    let fields: {};

    return {
        inputData: 'Soy Carlos Gutiérrez, el dueño de la finquita La Cumbre allá en Fredonia, Antioquia. Pa\' que sepas, ando metido en el café, ¿sabes? Mi cédula es 12345678, y la cédula cafetera es 9876543210. Soy macho, tengo como 35 años, y uso un celular de esos inteligentes. En La Esperanza, que es la vereda, tengo una parcela de 15 hectáreas. De esas, 10 son de café. Mi café es de la variedad Arábica, el tipo Castillo, bien tecnificao. Pa\' darte una idea, el año pasado saqué como 120 arrobas de café en total. Este año, pienso que voy a sacar más, unas 150 arrobas por hectárea, más o menos. Ah, y estoy en el mercado nacional, cuento con el permiso para que uses esta info.',
        message: '',
        isLoading: false,

        async sendData() {
            if (this.isLoading) return;

            this.isLoading = true;
            const endpoint = import.meta.env.VITE_API_URL;
            if (!fields)
                fields = await getFields();


            try {
                let body = {
                    messages: [
                        {
                            sender: "human",
                            content: this.inputData
                        }
                    ],
                    fields: fields
                };
                console.log("post message", body);
                let res = await fetch(endpoint + '/predict', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body),
                })
                let data = await res.json();
                this.message = JSON.stringify(data,null,2);
                console.log(data);

            } catch (error) {
                this.message = 'Error sending data';
                console.error('Error:', error);
            }
            this.isLoading = false;
        }
    }
}

async function getFields(): Promise<string[]> {
    const endpoint = import.meta.env.VITE_API_URL;

    console.log("post message");
    try {
        let res = await fetch(endpoint + '/fields', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        let data = await res.json()
        console.log(data);
        return data['fields'];
    } catch (error) {

        throw error;
    }



}

