const a: string = "Hello World!";
const n: number = 3;
const b: boolean = true;
const d: null = null;
const arr: string[] = ["aa", "bb", "cc", "dd"];
const arr2: any[] = ["aa", "bb", 3, true];
// typage objet avec parametres obligatoires
const user: { firstname: string; lastname: string } = {
  firstname: "Damien",
  lastname: "Gruffeille",
};
// typage objet avec certains parametres optionnels (?)
const user2: { firstname: string; lastname?: string } = {
  firstname: "Damien",
};
const date: Date = new Date();

const cb: Function = (e: MouseEvent) => {
  console.log("Hello!");
};

function printId(id: number | string) {}

const compteur = document.querySelector("#compteur") as HTMLButtonElement;
// si compteur est nul, ne pas ajouter l'addEventListener
compteur?.addEventListener("click", () => console.log("Hello!")); 
