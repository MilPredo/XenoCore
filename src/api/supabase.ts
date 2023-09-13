import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? ''
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY ?? ''
const supabase = createClient(supabaseUrl, supabaseKey);

// const { data, error } = await supabase.functions.invoke('test', {
//   body: { name: 'Functions' },
// })

// console.log(data, error)

export default supabase