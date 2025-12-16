'use server';

export async function createTicket(formData: FormData) {
  const data = {
    title: formData.get('title'),
    content: formData.get('content'),
  };

  console.log(data);
  //todo: Implement create ticket
}
