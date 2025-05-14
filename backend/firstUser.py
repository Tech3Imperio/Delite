from supabaseClient import supabase
from utils.auth.registerDealer import registerDealer
from dataTypes.auth.authTypes import DealerType, SignUpForm
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

new_dealer = SignUpForm(
    phone=9136010898,
    first_name="Aditya",
    last_name="Bhardwaj",
    email=None,
    password="abcdefgh",
    company_name="Example Corp",
    gst_number=None,
    address="123 Example St.",
    pin_code=110001,
    dealer_type=DealerType.silver
)

registerDealer(new_dealer)

print("The response is", new_dealer)
