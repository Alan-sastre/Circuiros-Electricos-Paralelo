class Puzzle3 extends Phaser.Scene {
  constructor() {
    super("Puzzle3");
    this.currentStep = 0;
    this.switches = [];
    this.bulbs = [];
  }

  create() {
    this.cameras.main.setBackgroundColor("rgba(0,0,0,0)");
    if (!this.scene.get("Puzzle4")) {
      this.scene.add("Puzzle4", Puzzle4, false);
    }
    this.createAnimatedBackground();
    this.drawPanel();
    this.drawCircuit();
    this.createSwitches();
    this.createGuide();
    this.updateGuide();
  }

  createAnimatedBackground() {
    const g = this.add.graphics().setDepth(-20);
    g.fillGradientStyle(0x14213d, 0x1d3557, 0x0b6e4f, 0x111827, 1);
    g.fillRect(0, 0, 1000, 500);
    for (let i = 0; i < 44; i += 1) {
      const dot = this.add.circle(
        Phaser.Math.Between(0, 1000),
        Phaser.Math.Between(0, 500),
        Phaser.Math.Between(2, 5),
        Phaser.Utils.Array.GetRandom([0x22d3ee, 0x38bdf8, 0x4ade80, 0xfacc15]),
        Phaser.Math.FloatBetween(0.18, 0.45),
      );
      dot.setDepth(-19);
      this.tweens.add({
        targets: dot,
        y: dot.y - Phaser.Math.Between(60, 130),
        alpha: 0.06,
        duration: Phaser.Math.Between(2200, 3600),
        yoyo: true,
        repeat: -1,
        ease: "Sine.inOut",
      });
    }
  }

  drawPanel() {
    const shadow = this.add.graphics();
    shadow.fillStyle(0x000000, 0.2);
    shadow.fillRoundedRect(54, 45, 900, 420, 30);

    const wood = this.add.graphics();
    wood.fillStyle(0xd4b08a, 1);
    wood.fillRoundedRect(45, 35, 910, 430, 28);
    wood.lineStyle(6, 0x89633f, 1);
    wood.strokeRoundedRect(45, 35, 910, 430, 28);
    wood.lineStyle(2, 0xe9c7a5, 0.32);
    for (let y = 58; y <= 432; y += 24) {
      wood.strokeLineShape(new Phaser.Geom.Line(70, y, 930, y + Phaser.Math.Between(-3, 3)));
    }

    const board = this.add.graphics();
    board.fillStyle(0x165d3e, 1);
    board.fillRoundedRect(100, 70, 800, 360, 24);
    board.lineStyle(3, 0x2f8d5f, 1);
    board.strokeRoundedRect(100, 70, 800, 360, 24);
    board.fillGradientStyle(0xffffff, 0xffffff, 0xffffff, 0xffffff, 0.05);
    board.fillRoundedRect(116, 84, 768, 140, 16);
  }

  drawCircuit() {
    const g = this.add.graphics();
    for (let x = 126; x <= 874; x += 24) {
      for (let y = 95; y <= 405; y += 22) {
        g.fillStyle(0x0f482f, 0.95);
        g.fillCircle(x, y, 2);
      }
    }

    g.lineStyle(8, 0xd35400, 0.96);
    g.strokeLineShape(new Phaser.Geom.Line(190, 120, 760, 120));
    g.strokeLineShape(new Phaser.Geom.Line(190, 380, 760, 380));
    g.lineStyle(8, 0x3b82f6, 0.96);
    g.strokeLineShape(new Phaser.Geom.Line(190, 120, 190, 380));
    g.strokeLineShape(new Phaser.Geom.Line(760, 120, 760, 380));
    g.strokeLineShape(new Phaser.Geom.Line(440, 120, 440, 200));
    g.strokeLineShape(new Phaser.Geom.Line(440, 300, 440, 380));
    g.strokeLineShape(new Phaser.Geom.Line(600, 120, 600, 200));
    g.strokeLineShape(new Phaser.Geom.Line(600, 300, 600, 380));

    g.lineStyle(3, 0xffffff, 0.28);
    g.strokeLineShape(new Phaser.Geom.Line(190, 116, 760, 116));
    g.strokeLineShape(new Phaser.Geom.Line(190, 376, 760, 376));
    g.strokeLineShape(new Phaser.Geom.Line(194, 120, 194, 380));
    g.strokeLineShape(new Phaser.Geom.Line(764, 120, 764, 380));
    g.strokeLineShape(new Phaser.Geom.Line(444, 120, 444, 200));
    g.strokeLineShape(new Phaser.Geom.Line(444, 300, 444, 380));
    g.strokeLineShape(new Phaser.Geom.Line(604, 120, 604, 200));
    g.strokeLineShape(new Phaser.Geom.Line(604, 300, 604, 380));

    this.bulbs.push(this.createBulb(440, 250));
    this.bulbs.push(this.createBulb(600, 250));

    g.fillStyle(0x11161c, 1);
    g.fillRoundedRect(148, 202, 44, 96, 10);
    g.fillStyle(0xd63031, 1);
    g.fillRoundedRect(148, 202, 44, 25, 10);
    g.fillStyle(0xced6e0, 1);
    g.fillRoundedRect(161, 190, 18, 12, 3);
  }

  createBulb(x, y) {
    const c = this.add.container(x, y);
    const glow = this.add.circle(0, 0, 34, 0xfff176, 0.08);
    const g = this.add.graphics();
    g.fillStyle(0xffffff, 0.86);
    g.fillCircle(0, 0, 24);
    g.lineStyle(2, 0xc8d6e5, 1);
    g.strokeCircle(0, 0, 24);
    g.fillStyle(0xfff3b0, 0.4);
    g.fillCircle(0, 2, 14);
    g.fillStyle(0xffffff, 0.4);
    g.fillEllipse(-6, -9, 10, 7);
    g.fillStyle(0x6c757d, 1);
    g.fillRoundedRect(-12, 20, 24, 15, 5);
    g.fillStyle(0xadb5bd, 1);
    g.fillRoundedRect(-12, 33, 24, 8, 4);
    c.add([glow, g]);
    c.glow = glow;
    return c;
  }

  createSwitches() {
    this.switches = [
      this.createSwitch(440, 250, "top"),
      this.createSwitch(600, 250, "bottom"),
    ];
  }

  createSwitch(x, y, id) {
    const c = this.add.container(x, y);
    const base = this.add.graphics();
    base.fillStyle(0x2f3640, 1);
    base.fillRoundedRect(-38, -14, 76, 28, 10);
    base.fillStyle(0x11161c, 1);
    base.fillRoundedRect(-34, -10, 68, 20, 8);
    base.fillStyle(0xffffff, 0.16);
    base.fillRoundedRect(-31, -8, 60, 5, 4);
    base.fillStyle(0x95a5a6, 1);
    base.fillCircle(-20, 0, 7);
    base.fillCircle(20, 0, 7);
    const lever = this.add.rectangle(-4, -9, 36, 8, 0xecf0f1).setOrigin(0, 0.5);
    lever.angle = -35;
    c.add([base, lever]);
    c.lever = lever;
    c.id = id;
    c.closed = false;
    c.setSize(80, 40);
    c.setInteractive({ cursor: "pointer" });
    c.on("pointerdown", () => this.tryToggleSwitch(c));
    return c;
  }

  tryToggleSwitch(sw) {
    const expected = this.switches[this.currentStep];
    if (expected !== sw || sw.closed) {
      this.tweens.add({
        targets: sw,
        x: sw.x + 8,
        duration: 80,
        yoyo: true,
      });
      return;
    }

    sw.closed = true;
    this.tweens.add({
      targets: sw.lever,
      angle: 0,
      duration: 200,
      ease: "Back.out",
    });

    this.activateBulb(this.currentStep);
    this.currentStep += 1;
    this.updateGuide();

    if (this.currentStep === this.switches.length) {
      this.completePuzzle();
    }
  }

  activateBulb(index) {
    const bulb = this.bulbs[index];
    this.tweens.add({
      targets: bulb.glow,
      alpha: 0.62,
      scale: 1.24,
      duration: 300,
      yoyo: true,
      repeat: 2,
    });
    this.sparkAroundBulb(bulb.x, bulb.y);
  }

  sparkAroundBulb(x, y) {
    for (let i = 0; i < 14; i += 1) {
      const a = (Math.PI * 2 * i) / 14;
      const dot = this.add.circle(x, y, 3.5, 0xfff176, 0.95);
      this.tweens.add({
        targets: dot,
        x: x + Math.cos(a) * 36,
        y: y + Math.sin(a) * 36,
        alpha: 0,
        duration: 420,
        ease: "Cubic.out",
        onComplete: () => dot.destroy(),
      });
    }
  }

  createGuide() {
    this.guide = this.add.text(0, 0, "👆🏻", { fontSize: "48px" }).setDepth(60);
  }

  updateGuide() {
    if (this.guideTween) {
      this.guideTween.stop();
    }
    const target = this.switches[this.currentStep];
    if (!target) {
      this.guide.setVisible(false);
      return;
    }

    this.guide.setVisible(true);
    const sourceX = target.x - 14;
    const sourceY = target.y - 74;
    const targetX = target.x - 6;
    const targetY = target.y - 44;
    this.guide.setPosition(sourceX, sourceY);
    this.guideTween = this.tweens.add({
      targets: this.guide,
      x: targetX,
      y: targetY,
      duration: 520,
      yoyo: true,
      repeat: -1,
      ease: "Sine.inOut",
    });

    for (let i = 0; i < this.switches.length; i += 1) {
      this.switches[i].alpha = i === this.currentStep ? 1 : 0.65;
    }
  }

  completePuzzle() {
    this.traceCurrent();
    this.launchConfetti();
    this.time.delayedCall(2800, () => {
      this.scene.start("Puzzle4");
    });
  }

  traceCurrent() {
    const path = [
      [190, 120],
      [760, 120],
      [760, 380],
      [190, 380],
      [190, 120],
    ];
    for (let r = 0; r < 2; r += 1) {
      for (let i = 0; i < path.length - 1; i += 1) {
        const p1 = path[i];
        const p2 = path[i + 1];
        const dot = this.add.circle(p1[0], p1[1], 5, 0x00d2d3, 0.95);
        this.tweens.add({
          targets: dot,
          x: p2[0],
          y: p2[1],
          duration: 460,
          delay: r * 720 + i * 360,
          ease: "Linear",
          onComplete: () => dot.destroy(),
        });
      }
    }
  }

  launchConfetti() {
    const colors = [0xff6b6b, 0xfeca57, 0x1dd1a1, 0x54a0ff, 0xff9ff3];
    for (let i = 0; i < 100; i += 1) {
      const x = Phaser.Math.Between(80, 920);
      const y = Phaser.Math.Between(-30, 100);
      const size = Phaser.Math.Between(4, 9);
      const confetti = this.add.rectangle(
        x,
        y,
        size,
        size * 1.8,
        Phaser.Utils.Array.GetRandom(colors),
      );
      confetti.rotation = Phaser.Math.FloatBetween(0, Math.PI);
      this.tweens.add({
        targets: confetti,
        x: x + Phaser.Math.Between(-150, 150),
        y: y + Phaser.Math.Between(270, 520),
        rotation: confetti.rotation + Phaser.Math.FloatBetween(2, 7),
        alpha: 0,
        duration: Phaser.Math.Between(1000, 1700),
        ease: "Quad.in",
        onComplete: () => confetti.destroy(),
      });
    }
  }
}
