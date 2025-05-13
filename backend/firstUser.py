from supabaseClient import supabase

response = supabase.auth.sign_up(
    {
        "email": "tech3@imperiorailing.com",
        "password": "12345678",
        "options": {
            "data": {
                    "full_name": "Aditya Bhardwaj",
                    "role": "admin",
                    "company": "Imperio Railing"
            }
        }
    }
)


print("The response is", response)
