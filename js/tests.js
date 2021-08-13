describe("Проверка инициализации персонажа", function() {
  let ro = new Mechanics();  
  let hero = new Hero("Newbie", ro);
    
    it("все базовые статы при создании равны 1", function() {
      assert.equal(hero.Str, 1);
      assert.equal(hero.Vit, 1);
      assert.equal(hero.Luk, 1);
      assert.equal(hero.Int, 1);
      assert.equal(hero.Dex, 1);
      assert.equal(hero.Agi, 1);
    });

    it("у персонажа есть имя и оно изменяемо", function() {
        assert.equal(hero.Name, "Newbie");
        assert.throw(() => { hero.Name = "123" }, Error);
        hero.Name = "Changed Name"
        assert.equal(hero.Name, "Changed Name");
      });
  
});

mocha.run();