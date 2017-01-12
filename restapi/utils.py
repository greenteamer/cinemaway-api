def get_fields(model_name):
    return {
        "user": ('username', 'email'),
        "profile": ('user', 'lastname', 'firstname'),
    }
