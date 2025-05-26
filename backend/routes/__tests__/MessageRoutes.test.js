const { supabase } = require('../../test/setup');

describe('Message Routes', () => {
  let testMessageId;

  beforeAll(async () => {
    // Setup test data
    const { data, error } = await supabase
      .from('messages')
      .insert([{ 
        content: 'Test Message',
        author: 'Test Author'
      }])
      .select();
    
    if (error) throw error;
    testMessageId = data[0].id;
  });

  afterAll(async () => {
    // Clean up test data
    if (testMessageId) {
      await supabase
        .from('messages')
        .delete()
        .eq('id', testMessageId);
    }
  });

  test('should create a new message', async () => {
    const { data, error } = await supabase
      .from('messages')
      .insert([{ 
        content: 'New Test Message',
        author: 'Test Author'
      }])
      .select();
    
    expect(error).toBeNull();
    expect(data[0].content).toBe('New Test Message');
    expect(data[0].author).toBe('Test Author');
  });

  test('should read a message', async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('id', testMessageId)
      .single();
    
    expect(error).toBeNull();
    expect(data.content).toBe('Test Message');
    expect(data.author).toBe('Test Author');
  });

  test('should update a message', async () => {
    const { data, error } = await supabase
      .from('messages')
      .update({ content: 'Updated Test Message' })
      .eq('id', testMessageId)
      .select();
    
    expect(error).toBeNull();
    expect(data[0].content).toBe('Updated Test Message');
  });

  test('should delete a message', async () => {
    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', testMessageId);
    
    expect(error).toBeNull();
  });
}); 