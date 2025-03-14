#include <iostream>
#include <string>
using namespace std;

// Model (Representa os dados do Usuário)
class User {
    private:
        string name;
        int age;
    public:
        User(string name, int age) : name(name), age(age) {}

        string getName() { return name; }
        int getAge() { return age; }

        void setName(string newName) { name = newName; }
        void setAge(int newAge) { age = newAge; }
};

    // View (Exibe informações do Usuário)
    class UserView {
    public:
        void displayUser(string name, int age) {
            cout << "Usuário: " << name << ", Idade: " << age << endl;
    }
};

// Controller (Gerencia a comunicação entre Model e View)
class UserController {
    private:
        User *model;
        UserView *view;
    public:
        UserController(User *model, UserView *view) : model(model), view(view) {}

        void setUserName(string name) { model->setName(name); }
        void setUserAge(int age) { model->setAge(age); }

        void updateView() { view->displayUser(model->getName(), model->getAge()); }
};

int main() {
    // Criando um usuário (Model)
    User user("Herich", 21);

    // Criando a View
    UserView view;

    // Criando o Controller
    UserController controller(&user, &view);

    // Exibir usuário inicial
    controller.updateView();

    // Modificar os dados do usuário
    controller.setUserName("Gabriel");
    controller.setUserAge(22);

    // Atualizar a View
    controller.updateView();

    return 0;
}
