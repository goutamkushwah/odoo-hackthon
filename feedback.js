    // Star rating functionality
        document.querySelectorAll('.stars').forEach(starContainer => {
            const stars = starContainer.querySelectorAll('.star');
            
            stars.forEach((star, index) => {
                star.addEventListener('click', () => {
                    const rating = index + 1;
                    starContainer.setAttribute('data-rating', rating);
                    
                    stars.forEach((s, i) => {
                        if (i < rating) {
                            s.classList.add('active');
                        } else {
                            s.classList.remove('active');
                        }
                    });
                });
                
                star.addEventListener('mouseenter', () => {
                    stars.forEach((s, i) => {
                        if (i <= index) {
                            s.style.color = '#ffd700';
                        } else {
                            s.style.color = '#ddd';
                        }
                    });
                });
            });
            
            starContainer.addEventListener('mouseleave', () => {
                const currentRating = parseInt(starContainer.getAttribute('data-rating'));
                stars.forEach((s, i) => {
                    if (i < currentRating) {
                        s.style.color = '#ffd700';
                    } else {
                        s.style.color = '#ddd';
                    }
                });
            });
        });

        function submitFeedback(button) {
            const card = button.closest('.feedback-card');
            const rating = parseInt(card.querySelector('.stars').getAttribute('data-rating'));
            const feedback = card.querySelector('.feedback-input').value;
            const successMessage = card.querySelector('.success-message');
            
            if (rating === 0) {
                alert('Please select a rating before submitting.');
                return;
            }
            
            if (feedback.trim() === '') {
                alert('Please provide feedback before submitting.');
                return;
            }
            
            // Show success message
            successMessage.style.display = 'block';
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);
            
            // Reset form
            card.querySelector('.feedback-input').value = '';
            card.querySelector('.stars').setAttribute('data-rating', '0');
            card.querySelectorAll('.star').forEach(star => {
                star.classList.remove('active');
                star.style.color = '#ddd';
            });
            
            // Add submission animation
            button.style.background = '#28a745';
            button.textContent = 'Submitted!';
            setTimeout(() => {
                button.style.background = 'linear-gradient(135deg, #4a90e2, #357abd)';
                button.textContent = 'Submit Feedback';
            }, 2000);
        }