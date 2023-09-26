function construct(memberdata) {
  const MemberObject = {
    name: memberdata.firstName,
    active: memberdata.isActiveMember,
    competitive: memberdata.isCompetitive,
    birthday: new Date(memberdata.dateOfBirth),
    email: memberdata.email,
    gender: memberdata.gender,
    image: memberdata.image,
    hasPayed: memberdata.hasPayed,
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
    getJuniorSeniorStatus() {
      return this.getAge() < 18 ? "Junior" : "Senior";
    },
  };

  return MemberObject;
}

export { construct };
