export class Student {
  constructor(public name: string, public age: number, public grade: string) {}
  getName(): string {
    return this.name;
  }
  getAge(): number {
    return this.age;
  }
  getGrade(): string {
    return this.grade;
  }
  setName(name: string): void {
    this.name = name;
  }
  setAge(age: number): void {
    this.age = age;
  }
  setGrade(grade: string): void {
    this.grade = grade;
  }
}
