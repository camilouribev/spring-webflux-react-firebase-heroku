package co.com.sofka.questions.usecases;

import co.com.sofka.questions.collections.Question;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.reposioties.QuestionRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import reactor.core.publisher.Mono;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;

import static org.mockito.Mockito.when;

@SpringBootTest
class UpdateUseCaseTest {

    @SpyBean
    private UpdateQuestionUseCase updateUseCase;

    @MockBean
    private QuestionRepository repository;

    @Test
    void updateTest(){

        var questionDTO = new QuestionDTO("111","xxx","is testing necessary?","CLOSED",
                "DEVELOPMENT",2,3, Arrays.asList("x1", "x2"),  "test@test.com");

        var question = new Question();
        question.setId("111");
        question.setUserId("xxx");
        question.setQuestion("is testing necessary?");
        question.setType("CLOSED");
        question.setCategory("DEVELOPMENT");
        question.setNumberOfReviews(2);
        question.setSumOfReviewScores(3);
        question.setUserReviews(List.of("X1","X2"));
        question.setUserEmail("test@test.com");

        when(repository.save(Mockito.any(Question.class))).thenReturn(Mono.just(question));

        var result = updateUseCase.apply(questionDTO);

        Assertions.assertEquals(Objects.requireNonNull(result.block()).getId(),questionDTO.getId());
    }


}