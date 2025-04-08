interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm') as HTMLFormElement;

  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData: RegisterFormData = {
      name: (document.getElementById('name') as HTMLInputElement).value,
      email: (document.getElementById('email') as HTMLInputElement).value,
      password: (document.getElementById('password') as HTMLInputElement).value,
      confirmPassword: (document.getElementById('confirmPassword') as HTMLInputElement).value
    };

    if (formData.password !== formData.confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      if (response.ok) {
        alert('Registro realizado com sucesso! Faça login para continuar.');
        window.location.href = 'login.html';
      } else {
        const error = await response.json();
        alert(error.message || 'Erro ao registrar');
      }
    } catch (error) {
      console.error('Erro ao registrar:', error);
      alert('Erro ao registrar. Tente novamente.');
    }
  });
}); 