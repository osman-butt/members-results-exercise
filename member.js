function construct(memberData) {
  const MemberObject = {
    firstName: memberData.firstName,
    lastName: memberData.lastName,
    id: memberData.id,
    image: memberData.image,
    active: memberData.isActiveMember,
    competitive: memberData.isCompetitive,
    birthday: new Date(memberData.dateOfBirth),
    email: memberData.email,
    gender: memberData.gender,
    image: memberData.image,
    hasPayed: memberData.hasPayed,
    set name(memberData) {
      this._name = memberData.firstName + " " + memberData.lastname;
    },
    get name() {
      return this._name;
    },
    getAge() {
      const today = new Date();
      const dob = this.birthday;
      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      const dayDiff = today.getDate() - dob.getDate();
      // The function assumes that dob <= today
      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
      }
      return age;
    },
    isJunior() {
      return this.getAge() < 18 ? true : false;
    },
    isSenior() {
      return this.getAge() < 18 ? false : true;
    },
    // getJuniorSeniorStatus() {
    //   return this.getAge() < 18 ? "Junior" : "Senior";
    // },
  };
  Object.defineProperty(MemberObject, "id", { writable: false });
  Object.defineProperty(MemberObject, "name", { enumerable: false });
  Object.defineProperty(MemberObject, "image", { enumerable: false });
  return MemberObject;
}

export { construct };
