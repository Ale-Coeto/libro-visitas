const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

class MessageService {
  async getAllMessages() {
    const { data, error } = await supabase
      .from('mensajes')
      .select('*')
      .order('fecha', { ascending: false });

    if (error) throw new Error(error.message);
    return data;
  }

  async addMessage(nombre, mensaje) {
    const { data, error } = await supabase
      .from('mensajes')
      .insert([{ nombre, mensaje }])
      .select();

    if (error) throw new Error(error.message);
    return data[0];
  }
}

module.exports = MessageService;