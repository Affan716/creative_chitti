// Advanced AI Exercise System for Creative Chitti - Hyper Enhanced Version
class AdvancedMathChallengeAI {
    constructor() {
        this.currentExercise = null;
        this.exerciseActive = false;
        this.clicksUsed = 0;
        this.currentTotal = 0; // New property to track the player's current number
        this.score = 0;
        this.totalExercises = 0;
        this.perfectSolutions = 0;
        this.streak = 0;
        this.maxStreak = 0;
        this.timeStarted = null;
        this.averageTime = 0;
        this.playerLevel = 1;
        this.experience = 0;
        this.achievements = new Set();
        this.exerciseHistory = {}; // Changed to object for easier key-based access
        this.adaptiveDifficulty = 0.5; // 0 = easiest, 1 = hardest

        this.learningProfile = {
            strengths: [],
            weaknesses: [],
            preferredPatterns: []
        };

        // Advanced exercise generation system
        this.exercisePatterns = {
            powers_of_ten: { weight: 1.0, complexity: 0.2 },
            palindromes: { weight: 0.8, complexity: 0.4 },
            fibonacci_like: { weight: 0.6, complexity: 0.6 },
            prime_sums: { weight: 0.7, complexity: 0.7 },
            geometric_sequences: { weight: 0.5, complexity: 0.8 },
            factorial_approximations: { weight: 0.4, complexity: 0.9 },
            mathematical_constants: { weight: 0.3, complexity: 1.0 }
        };

        // Dynamic hint system with multiple strategies
        this.hintStrategies = {
            decomposition: "Break the number into smaller, manageable parts",
            pattern_recognition: "Look for patterns or sequences in the target number",
            optimization: "Consider the most efficient path using the fewest clicks",
            mathematical_insight: "Think about the mathematical properties of this number",
            working_backwards: "Start from the target and work backwards to find the path",
            place_value: "Consider the place values and build from largest to smallest",
            shortcuts: "Look for mathematical shortcuts or elegant solutions"
        };

        // Achievement system
        this.achievementDefinitions = {
            first_perfect: { name: "Perfect Start", desc: "Complete your first exercise with optimal clicks", icon: "⭐" },
            speed_demon: { name: "Speed Demon", desc: "Complete an exercise in under 10 seconds", icon: "⚡" },
            streak_5: { name: "On Fire", desc: "Get 5 perfect solutions in a row", icon: "🔥" },
            streak_10: { name: "Unstoppable", desc: "Get 10 perfect solutions in a row", icon: "💫" },
            mathematician: { name: "Mathematician", desc: "Complete 50 exercises", icon: "🎓" },
            pattern_master: { name: "Pattern Master", desc: "Solve 10 different pattern types", icon: "🧩" },
            efficiency_expert: { name: "Efficiency Expert", desc: "Maintain 90%+ efficiency over 20 exercises", icon: "🎯" },
            level_10: { name: "Expert", desc: "Reach level 10", icon: "👑" },
            big_numbers: { name: "Big Number Handler", desc: "Solve a number over 10 million", icon: "🌟" },
            lightning_fast: { name: "Lightning Fast", desc: "Average under 15 seconds per exercise over 10 exercises", icon: "⚡️" }
        };
    }

    generateAdvancedExercise() {
        // Adaptive difficulty based on player performance
        const baseComplexity = Math.min(0.9, this.adaptiveDifficulty + (this.playerLevel - 1) * 0.1);
        const pattern = this.selectPattern(baseComplexity);

        let exercise;
        switch (pattern) {
            case 'powers_of_ten':
                exercise = this.generatePowersOfTenExercise(baseComplexity);
                break;
            case 'palindromes':
                exercise = this.generatePalindromeExercise(baseComplexity);
                break;
            case 'fibonacci_like':
                exercise = this.generateFibonacciLikeExercise(baseComplexity);
                break;
            case 'prime_sums':
                exercise = this.generatePrimeSumExercise(baseComplexity);
                break;
            case 'geometric_sequences':
                exercise = this.generateGeometricExercise(baseComplexity);
                break;
            case 'factorial_approximations':
                exercise = this.generateFactorialExercise(baseComplexity);
                break;
            case 'mathematical_constants':
                exercise = this.generateMathConstantExercise(baseComplexity);
                break;
            default:
                exercise = this.generateDynamicExercise(baseComplexity);
        }

        this.currentExercise = {
            ...exercise,
            pattern: pattern,
            timeLimit: this.calculateTimeLimit(exercise.difficulty),
            bonusMultiplier: this.calculateBonusMultiplier(pattern, baseComplexity)
        };

        this.exerciseActive = true;
        this.clicksUsed = 0;
        this.currentTotal = 0; // Reset total for the new exercise
        this.timeStarted = Date.now();

        this.updateAdvancedUI();
        this.enableButtons();
    }

    // All `generate...Exercise` methods remain the same

    generatePowersOfTenExercise(complexity) {
        const bases = [1, 11, 101, 111, 1001, 1010, 1100, 1110, 1111];
        const multipliers = [1, 10, 100, 1000, 10000, 100000, 1000000];

        const complexityIndex = Math.floor(complexity * (bases.length - 1));
        const base = bases[complexityIndex];
        const multiplier = multipliers[Math.floor(complexity * (multipliers.length - 1))];

        const target = base * multiplier;
        const minClicks = this.calculateOptimalClicks(target);

        return {
            target: target,
            minClicks: minClicks,
            difficulty: this.getDifficultyLabel(complexity),
            points: Math.round(50 + complexity * 100),
            explanation: `This is ${base} × ${multiplier}, representing powers of 10 patterns`
        };
    }

    generatePalindromeExercise(complexity) {
        const palindromes = [11, 101, 111, 121, 131, 141, 151, 161, 171, 181, 191,
            1001, 1111, 1221, 1331, 1441, 1551, 2112, 2222, 3223,
            10001, 10101, 10201, 11011, 11111, 11211, 12121, 12221];

        const index = Math.floor(complexity * complexity * (palindromes.length - 1));
        const target = palindromes[Math.min(index, palindromes.length - 1)];

        return {
            target: target,
            minClicks: this.calculateOptimalClicks(target),
            difficulty: this.getDifficultyLabel(complexity),
            points: Math.round(60 + complexity * 120),
            explanation: `${target} is a palindrome - it reads the same forwards and backwards`
        };
    }

    generateFibonacciLikeExercise(complexity) {
        const fibNumbers = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584];
        const consecutiveSums = [3, 6, 10, 15, 21, 28, 36, 45, 55, 66, 78, 91, 105, 120, 136, 153];

        const allNumbers = [...fibNumbers, ...consecutiveSums];
        const multiplier = Math.floor(1 + complexity * 100);
        const baseNumber = allNumbers[Math.floor(complexity * (allNumbers.length - 1))];
        const target = baseNumber * multiplier;

        return {
            target: target,
            minClicks: this.calculateOptimalClicks(target),
            difficulty: this.getDifficultyLabel(complexity),
            points: Math.round(70 + complexity * 140),
            explanation: `This number follows a mathematical sequence pattern`
        };
    }

    generatePrimeSumExercise(complexity) {
        const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
        const numPrimes = Math.max(2, Math.floor(2 + complexity * 4));

        let target = 0;
        for (let i = 0; i < numPrimes; i++) {
            target += primes[Math.floor(Math.random() * Math.min(primes.length, 10 + complexity * 15))];
        }

        const multiplier = Math.floor(1 + complexity * 1000);
        target *= multiplier;

        return {
            target: target,
            minClicks: this.calculateOptimalClicks(target),
            difficulty: this.getDifficultyLabel(complexity),
            points: Math.round(80 + complexity * 160),
            explanation: `This number is related to prime number combinations`
        };
    }

    generateGeometricExercise(complexity) {
        const bases = [2, 3, 5, 7, 11];
        const base = bases[Math.floor(complexity * bases.length)];
        const power = Math.floor(1 + complexity * 8);
        const target = Math.pow(base, power) + Math.floor(complexity * 1000);

        return {
            target: target,
            minClicks: this.calculateOptimalClicks(target),
            difficulty: this.getDifficultyLabel(complexity),
            points: Math.round(90 + complexity * 180),
            explanation: `This number is based on geometric progression: ${base}^${power} with variations`
        };
    }

    generateFactorialExercise(complexity) {
        const factorials = [1, 2, 6, 24, 120, 720, 5040, 40320, 362880];
        const index = Math.floor(complexity * (factorials.length - 1));
        const baseFactorial = factorials[index];
        const variation = Math.floor(complexity * 500);
        const target = baseFactorial + variation;

        return {
            target: target,
            minClicks: this.calculateOptimalClicks(target),
            difficulty: this.getDifficultyLabel(complexity),
            points: Math.round(100 + complexity * 200),
            explanation: `This number is close to ${index + 1}! (factorial) with modifications`
        };
    }

    generateMathConstantExercise(complexity) {
        const constants = {
            pi: 3141592653589793,
            e: 2718281828459045,
            phi: 1618033988749895,
            sqrt2: 1414213562373095
        };

        const constantNames = Object.keys(constants);
        const chosenConstant = constantNames[Math.floor(Math.random() * constantNames.length)];
        const constantValue = constants[chosenConstant];

        const digits = Math.floor(3 + complexity * 8);
        const target = parseInt(constantValue.toString().substring(0, digits));

        return {
            target: target,
            minClicks: this.calculateOptimalClicks(target),
            difficulty: this.getDifficultyLabel(complexity),
            points: Math.round(120 + complexity * 240),
            explanation: `This represents digits from the mathematical constant ${chosenConstant}`
        };
    }

    generateDynamicExercise(complexity) {
        const magnitude = Math.floor(Math.pow(10, 1 + complexity * 6));
        const randomFactor = Math.random() * 0.9 + 0.1;
        const target = Math.floor(magnitude * randomFactor);

        return {
            target: target,
            minClicks: this.calculateOptimalClicks(target),
            difficulty: this.getDifficultyLabel(complexity),
            points: Math.round(40 + complexity * 80),
            explanation: `A dynamically generated challenge based on your current skill level`
        };
    }

    calculateOptimalClicks(target) {
        // This is a greedy algorithm, which is optimal for this specific button set.
        const buttons = [10000000, 1000000, 100000, 10000, 1000, 100, 10, 1];
        let remaining = target;
        let clicks = 0;

        for (const button of buttons) {
            const timesToPress = Math.floor(remaining / button);
            clicks += timesToPress;
            remaining -= timesToPress * button;
            if (remaining === 0) break;
        }

        return clicks;
    }

    selectPattern(complexity) {
        // Weighted selection based on complexity and learning profile
        const availablePatterns = Object.keys(this.exercisePatterns).filter(pattern =>
            this.exercisePatterns[pattern].complexity <= complexity + 0.2
        );

        const weights = availablePatterns.map(pattern => {
            let weight = this.exercisePatterns[pattern].weight;
            if (this.learningProfile.strengths.includes(pattern)) weight *= 1.3;
            if (this.learningProfile.weaknesses.includes(pattern)) weight *= 0.7;
            return weight;
        });

        const totalWeight = weights.reduce((sum, w) => sum + w, 0);
        const random = Math.random() * totalWeight;

        let currentWeight = 0;
        for (let i = 0; i < availablePatterns.length; i++) {
            currentWeight += weights[i];
            if (random <= currentWeight) {
                return availablePatterns[i];
            }
        }

        return availablePatterns[availablePatterns.length - 1];
    }

    getDifficultyLabel(complexity) {
        if (complexity < 0.3) return 'easy';
        if (complexity < 0.6) return 'medium';
        if (complexity < 0.8) return 'hard';
        return 'expert';
    }

    calculateTimeLimit(difficulty) {
        const baseTimes = { easy: 60, medium: 90, hard: 120, expert: 180 };
        return baseTimes[difficulty] || 60;
    }

    calculateBonusMultiplier(pattern, complexity) {
        return 1 + complexity * 0.5 + (this.exercisePatterns[pattern]?.complexity || 0) * 0.3;
    }

    updateAdvancedUI() {
        const questionEl = document.getElementById('exercise-question');
        const feedbackEl = document.getElementById('exercise-feedback');
        const clicksEl = document.getElementById('clicks-counter');
        const scoreEl = document.getElementById('score-counter');

        if (this.currentExercise) {
            const difficultyEmojis = {
                'easy': '🟢',
                'medium': '🟡',
                'hard': '🟠',
                'expert': '🔴'
            };

            const timeRemaining = this.currentExercise.timeLimit - Math.floor((Date.now() - this.timeStarted) / 1000);

            questionEl.innerHTML = `
                ${difficultyEmojis[this.currentExercise.difficulty]} 
                <strong>Challenge Level ${this.playerLevel}:</strong> Create <strong>${this.currentExercise.target}</strong><br>
                <small>Pattern: ${this.currentExercise.pattern.replace('_', ' ')} | 
                Optimal: ${this.currentExercise.minClicks} clicks | 
                Points: ${this.currentExercise.points} × ${this.currentExercise.bonusMultiplier.toFixed(1)} | 
                Time: ${Math.max(0, timeRemaining)}s</small><br>
                <small style="font-style: italic; color: #666;">${this.currentExercise.explanation}</small>
            `;
        }

        // Display the current total
        const totalDisplayEl = document.getElementById('current-total');
        if (totalDisplayEl) {
            totalDisplayEl.textContent = `Current Total: ${this.currentTotal}`;
        }

        clicksEl.innerHTML = `
            <div>Clicks: ${this.clicksUsed} | Streak: ${this.streak} | Level: ${this.playerLevel}</div>
            <div style="font-size: 0.8em; color: #666;">EXP: ${this.experience}/${this.getExpRequiredForNextLevel()} | Efficiency: ${this.calculateOverallEfficiency().toFixed(1)}%</div>
        `;
        scoreEl.textContent = `Score: ${this.score} | Exercises: ${this.totalExercises}`;

        this.updateProgressBar();
        this.displayAchievements();
    }

    // Placeholder methods for UI interaction - you will need to implement these
    enableButtons() {
        // e.g., document.querySelectorAll('.calculator-button').forEach(btn => btn.disabled = false);
    }
    
    disableButtons() {
        // e.g., document.querySelectorAll('.calculator-button').forEach(btn => btn.disabled = true);
    }

    getExpRequiredForNextLevel() {
        return this.playerLevel * 100 + Math.pow(this.playerLevel, 2) * 10;
    }

    updateProgressBar() {
        let progressEl = document.getElementById('progress-bar');
        if (!progressEl) {
            progressEl = document.createElement('div');
            progressEl.id = 'progress-bar';
            progressEl.style.cssText = `
                width: 100%; height: 8px; background: #e0e0e0; border-radius: 4px;
                margin: 10px 0; overflow: hidden; position: relative;
            `;
            const statsContainer = document.getElementById('exercise-stats');
            if (statsContainer) {
                statsContainer.appendChild(progressEl);
            }
        }

        const expForNextLevel = this.getExpRequiredForNextLevel();
        const progressPercent = (this.experience / expForNextLevel) * 100;

        // Reset progress bar on level up
        const progressWidth = Math.min(100, progressPercent);

        progressEl.innerHTML = `
            <div style="width: ${progressWidth}%; height: 100%; background: linear-gradient(90deg, #4CAF50, #8BC34A); transition: width 0.3s;"></div>
        `;
    }

    displayAchievements() {
        let achievementsEl = document.getElementById('achievements-display');
        if (!achievementsEl) {
            achievementsEl = document.createElement('div');
            achievementsEl.id = 'achievements-display';
            achievementsEl.style.cssText = `
                margin-top: 10px; padding: 10px; background: #f8f9fa; border-radius: 5px;
                font-size: 0.9em; text-align: center;
            `;
            const statsContainer = document.getElementById('exercise-stats');
            if (statsContainer) {
                statsContainer.appendChild(achievementsEl);
            }
        }

        const recentAchievements = Array.from(this.achievements).slice(-3);
        if (recentAchievements.length > 0) {
            achievementsEl.innerHTML = `<strong>Recent Achievements:</strong> ${recentAchievements.map(id =>
                `${this.achievementDefinitions[id].icon} ${this.achievementDefinitions[id].name}`
            ).join(' • ')}`;
        } else {
            achievementsEl.innerHTML = '<em>Complete challenges to earn achievements!</em>';
        }
    }

    onCalculatorClick(value) {
        if (this.exerciseActive) {
            this.clicksUsed++;
            this.currentTotal += value; // Add the clicked value to the total
            this.updateAdvancedUI();

            // Check for time limit
            const elapsed = (Date.now() - this.timeStarted) / 1000;
            if (elapsed > this.currentExercise.timeLimit) {
                this.handleTimeUp();
            }
        }
    }

    handleTimeUp() {
        const feedbackEl = document.getElementById('exercise-feedback');
        feedbackEl.innerHTML = `<div class="error">⏰ Time's up! The target was ${this.currentExercise.target}. Try again!</div>`;
        this.exerciseActive = false;
        this.disableButtons();
        this.updateLearningProfile(false);
    }

    checkAnswer() {
        if (!this.exerciseActive || !this.currentExercise) return;

        const currentValue = this.currentTotal; // Use the class property
        const target = this.currentExercise.target;
        const feedbackEl = document.getElementById('exercise-feedback');
        const timeTaken = (Date.now() - this.timeStarted) / 1000;

        if (currentValue === target) {
            this.handleCorrectAnswer(timeTaken);
        } else {
            this.handleIncorrectAnswer(currentValue, target);
        }
    }

    handleCorrectAnswer(timeTaken) {
        const efficiency = this.calculateAdvancedEfficiency();
        const timeBonus = this.calculateTimeBonus(timeTaken);
        const streakBonus = this.calculateStreakBonus();
        const basePoints = this.currentExercise.points;
        const totalMultiplier = this.currentExercise.bonusMultiplier * timeBonus * streakBonus;
        const pointsEarned = Math.round(basePoints * efficiency * totalMultiplier);

        this.score += pointsEarned;
        this.totalExercises++;
        this.experience += Math.round(pointsEarned / 10);

        if (this.clicksUsed === this.currentExercise.minClicks) {
            this.perfectSolutions++;
            this.streak++;
            this.maxStreak = Math.max(this.maxStreak, this.streak);
        } else {
            this.streak = 0;
        }

        this.checkLevelUp();
        this.checkAchievements(timeTaken, efficiency);
        this.updateLearningProfile(true);

        let message = this.generateSuccessMessage(efficiency, timeTaken, pointsEarned, totalMultiplier);

        const feedbackEl = document.getElementById('exercise-feedback');
        feedbackEl.innerHTML = `<div class="success">${message}</div>`;

        this.exerciseActive = false;
        this.disableButtons();
        this.updateAdaptiveDifficulty(true, efficiency, timeTaken);
    }

    handleIncorrectAnswer(currentValue, target) {
        const feedbackEl = document.getElementById('exercise-feedback');
        this.streak = 0;
        this.updateLearningProfile(false);

        if (currentValue > target) {
            feedbackEl.innerHTML = `<div class="error">❌ Overshot! You have ${currentValue}, but need exactly ${target}. Reset and try a different approach.</div>`;
        } else {
            const difference = target - currentValue;
            const suggestion = this.generateSmartSuggestion(difference);
            feedbackEl.innerHTML = `<div class="info">📊 Current: ${currentValue}, Target: ${target} (${difference} more needed)<br>💡 ${suggestion}</div>`;
        }
        this.updateAdaptiveDifficulty(false, 0, 0);
    }

    generateSmartSuggestion(difference) {
        const buttons = [10000000, 1000000, 100000, 10000, 1000, 100, 10, 1];
        const suggestions = [];

        for (const button of buttons) {
            const times = Math.floor(difference / button);
            if (times > 0) {
                suggestions.push(`${times}×(+${button})`);
                difference -= times * button;
                if (suggestions.length >= 3) break;
            }
        }

        return `Try: ${suggestions.join(' + ')}`;
    }

    calculateAdvancedEfficiency() {
        const optimalClicks = this.currentExercise.minClicks;
        const actualClicks = this.clicksUsed;

        if (actualClicks === optimalClicks) return 1.0;
        return Math.max(0.1, optimalClicks / actualClicks);
    }

    calculateTimeBonus(timeTaken) {
        const timeLimit = this.currentExercise.timeLimit;
        if (timeTaken < 10) return 2.0;
        if (timeTaken < 20) return 1.5;
        if (timeTaken < timeLimit * 0.5) return 1.2;
        if (timeTaken < timeLimit * 0.8) return 1.0;
        return 0.8;
    }

    calculateStreakBonus() {
        if (this.streak >= 10) return 2.5;
        if (this.streak >= 5) return 2.0;
        if (this.streak >= 3) return 1.5;
        if (this.streak >= 1) return 1.2;
        return 1.0;
    }

    generateSuccessMessage(efficiency, timeTaken, pointsEarned, multiplier) {
        let message = `🎉 <strong>Correct!</strong> Target ${this.currentExercise.target} achieved!<br>`;

        if (efficiency === 1.0) {
            message += `⭐ <strong>Perfect Solution!</strong> Used optimal ${this.clicksUsed} clicks!<br>`;
        } else {
            message += `✅ Used ${this.clicksUsed} clicks (optimal: ${this.currentExercise.minClicks})<br>`;
        }

        if (timeTaken < 15) {
            message += `⚡ <strong>Lightning Fast!</strong> Completed in ${timeTaken.toFixed(1)}s<br>`;
        }

        if (this.streak > 1) {
            message += `🔥 <strong>Streak: ${this.streak}!</strong> Keep it up!<br>`;
        }

        message += `💰 Points: ${pointsEarned} (${multiplier.toFixed(1)}× multiplier)`;

        return message;
    }

    checkLevelUp() {
        const expRequired = this.getExpRequiredForNextLevel();
        if (this.experience >= expRequired) {
            this.playerLevel++;
            // Don't subtract expRequired, as it should be cumulative, but update progress bar logic
            // this.experience -= expRequired;
            
            const feedbackEl = document.getElementById('exercise-feedback');
            setTimeout(() => {
                feedbackEl.innerHTML = `<div class="success">🎊 <strong>LEVEL UP!</strong> You're now Level ${this.playerLevel}! New challenges unlocked!</div>`;
            }, 2000);

            this.checkAchievements(0, 1, 'level_10');
        }
    }

    checkAchievements(timeTaken, efficiency) {
        const newAchievements = [];

        if (!this.achievements.has('first_perfect') && this.perfectSolutions === 1) {
            newAchievements.push('first_perfect');
        }

        if (!this.achievements.has('speed_demon') && timeTaken < 10) {
            newAchievements.push('speed_demon');
        }

        if (!this.achievements.has('streak_5') && this.streak === 5) {
            newAchievements.push('streak_5');
        }

        if (!this.achievements.has('streak_10') && this.streak === 10) {
            newAchievements.push('streak_10');
        }

        if (!this.achievements.has('mathematician') && this.totalExercises >= 50) {
            newAchievements.push('mathematician');
        }

        if (!this.achievements.has('level_10') && this.playerLevel >= 10) {
            newAchievements.push('level_10');
        }

        if (!this.achievements.has('big_numbers') && this.currentExercise?.target > 10000000) {
            newAchievements.push('big_numbers');
        }
        
        // This achievement check needs more context from the `exerciseHistory`
        if (!this.achievements.has('pattern_master') && Object.keys(this.exerciseHistory).length >= 10) {
             newAchievements.push('pattern_master');
        }

        newAchievements.forEach(achievement => {
            this.achievements.add(achievement);
            this.showAchievementNotification(achievement);
        });
    }

    showAchievementNotification(achievementId) {
        const achievement = this.achievementDefinitions[achievementId];
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed; top: 20px; right: 20px; z-index: 1000;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white; padding: 15px 20px; border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3); font-weight: bold;
            animation: slideIn 0.5s ease-out; max-width: 300px;
        `;
        notification.innerHTML = `
            ${achievement.icon} <strong>Achievement Unlocked!</strong><br>
            <div style="font-size: 0.9em; margin-top: 5px;">${achievement.name}: ${achievement.desc}</div>
        `;

        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 4000);

        // Add slide-in animation
        let style = document.getElementById('achievement-style');
        if (!style) {
            style = document.createElement('style');
            style.id = 'achievement-style';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    updateLearningProfile(success) {
        const pattern = this.currentExercise?.pattern;
        if (!pattern) return;

        if (!this.exerciseHistory[pattern]) {
            this.exerciseHistory[pattern] = { attempts: 0, successes: 0, avgEfficiency: 0 };
        }

        this.exerciseHistory[pattern].attempts++;
        if (success) {
            this.exerciseHistory[pattern].successes++;
            const efficiency = this.calculateAdvancedEfficiency();
            this.exerciseHistory[pattern].avgEfficiency =
                (this.exerciseHistory[pattern].avgEfficiency + efficiency) / 2;
        }

        this.learningProfile.strengths = [];
        this.learningProfile.weaknesses = [];

        Object.keys(this.exerciseHistory).forEach(p => {
            const data = this.exerciseHistory[p];
            const successRate = data.successes / data.attempts;

            if (data.attempts >= 3) {
                if (successRate >= 0.8 && data.avgEfficiency >= 0.8) {
                    this.learningProfile.strengths.push(p);
                } else if (successRate < 0.5 || data.avgEfficiency < 0.5) {
                    this.learningProfile.weaknesses.push(p);
                }
            }
        });
    }

    updateAdaptiveDifficulty(success, efficiency, timeTaken) {
        const adjustment = success ?
            (efficiency > 0.8 && timeTaken < 30 ? 0.05 : 0.02) :
            -0.03;

        this.adaptiveDifficulty = Math.max(0.1, Math.min(1.0, this.adaptiveDifficulty + adjustment));
    }

    calculateOverallEfficiency() {
        if (this.totalExercises === 0) return 100;

        const perfectRatio = this.perfectSolutions / this.totalExercises;
        return perfectRatio * 100;
    }

    showAdvancedHint() {
        if (!this.exerciseActive || !this.currentExercise) return;

        const target = this.currentExercise.target;
        const current = this.currentTotal;
        const remaining = target - current;

        const strategies = Object.keys(this.hintStrategies);
        const strategy = strategies[Math.floor(Math.random() * strategies.length)];

        let hint = this.hintStrategies[strategy];

        if (remaining > 0) {
            const optimalPath = this.calculateOptimalPath(remaining);
            hint += `<br><br>💡 <strong>Specific hint:</strong> You need ${remaining} more. `;

            if (strategy === 'decomposition') {
                hint += `Try breaking ${remaining} into: ${optimalPath}`;
            } else if (strategy === 'working_backwards') {
                hint += `Working backwards: ${target} - ${current} = ${remaining}`;
            } else if (strategy === 'pattern_recognition') {
                hint += this.generatePatternHint(target);
            } else {
                hint += `Consider using: ${optimalPath}`;
            }
        }

        if (this.currentExercise.pattern) {
            hint += this.getPatternSpecificHint(this.currentExercise.pattern, target);
        }

        const feedbackEl = document.getElementById('exercise-feedback');
        feedbackEl.innerHTML = `<div class="hint">💡 <strong>${strategy.replace('_', ' ').toUpperCase()} Strategy:</strong><br>${hint}</div>`;
    }

    calculateOptimalPath(remaining) {
        const buttons = [10000000, 1000000, 100000, 10000, 1000, 100, 10, 1];
        const path = [];
        let temp = remaining;

        for (const button of buttons) {
            const times = Math.floor(temp / button);
            if (times > 0) {
                path.push(`${times}×(+${button.toLocaleString()})`);
                temp -= times * button;
            }
        }

        return path.join(' + ');
    }

    generatePatternHint(target) {
        const str = target.toString();

        if (str === str.split('').reverse().join('')) {
            return ` This is a palindrome!`;
        } else if (str.includes('111')) {
            return ` Notice the repeated digits!`;
        } else if (str.endsWith('000')) {
            return ` This is a round number - think thousands!`;
        } else {
            return ` Look for mathematical patterns in ${target}.`;
        }
    }

    getPatternSpecificHint(pattern, target) {
        const hints = {
            powers_of_ten: `<br>🔢 Powers of 10 tip: This number is built from 1s and 0s multiplied by powers of 10.`,
            // Add more specific hints for other patterns here
        };
        return hints[pattern] || "";
    }
}